"""
Refactored FastAPI application with clean architecture.
"""
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import logging
from datetime import datetime
from time import time
from typing import List

from .config import get_settings
from .models import (
    CustomerInput, PredictionResponse, SegmentProfile,
    BatchPredictionRequest, BatchPredictionResponse,
    HealthResponse, ErrorResponse
)
from .services import model_service, SegmentService
from .middleware import RateLimitMiddleware, LoggingMiddleware, SecurityHeadersMiddleware

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Application lifespan
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events."""
    # Startup
    logger.info("Starting SegmentAI Pro API...")
    settings = get_settings()
    
    # Load ML models
    success, message = model_service.load_models()
    if success:
        logger.info("✓ Models loaded successfully")
    else:
        logger.warning(f"⚠ Model loading issue: {message}")
    
    yield
    
    # Shutdown
    logger.info("Shutting down SegmentAI Pro API...")


# Create FastAPI app
settings = get_settings()
app = FastAPI(
    title=settings.app_name,
    description="Production-ready customer segmentation API with ML predictions",
    version=settings.app_version,
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc"
)

# Add middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if settings.rate_limit_enabled:
    app.add_middleware(
        RateLimitMiddleware,
        max_requests=settings.max_requests_per_minute,
        window_seconds=60
    )

app.add_middleware(LoggingMiddleware)
app.add_middleware(SecurityHeadersMiddleware)

# Startup time for uptime calculation
startup_time = datetime.utcnow()


# Exception handlers
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content=ErrorResponse(
            error=exc.detail,
            detail=str(exc)
        ).dict()
    )


@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    logger.error(f"Unhandled exception: {exc}")
    return JSONResponse(
        status_code=500,
        content=ErrorResponse(
            error="Internal server error",
            detail=str(exc) if settings.debug else None
        ).dict()
    )


# Routes
@app.get("/", tags=["General"])
async def root():
    """API root endpoint with information."""
    return {
        "name": settings.app_name,
        "version": settings.app_version,
        "status": "operational",
        "documentation": "/docs",
        "endpoints": {
            "health": "/health",
            "predict": "/predict",
            "batch_predict": "/batch-predict",
            "segments": "/segments"
        }
    }


@app.get("/health", response_model=HealthResponse, tags=["General"])
async def health_check():
    """Health check endpoint for monitoring."""
    uptime = (datetime.utcnow() - startup_time).total_seconds()
    
    return HealthResponse(
        status="healthy" if model_service.is_ready() else "degraded",
        model_loaded=model_service.model is not None,
        scaler_loaded=model_service.scaler is not None,
        version=settings.app_version,
        uptime_seconds=round(uptime, 2)
    )


@app.get("/segments", response_model=List[SegmentProfile], tags=["Segments"])
async def get_segments():
    """
    Get all available customer segments with detailed profiles.
    
    Returns comprehensive information about each segment including:
    - Segment characteristics
    - Marketing strategies
    - Target demographics
    """
    return SegmentService.get_all_segments()


@app.post("/predict", response_model=PredictionResponse, tags=["Predictions"])
async def predict_segment(customer: CustomerInput):
    """
    Predict customer segment based on demographic and behavioral data.
    
    **Input:**
    - age: Customer age (18-100)
    - annual_income: Annual income in thousands
    - spending_score: Spending behavior score (1-100)
    
    **Output:**
    - Predicted segment with confidence score
    - Marketing strategy recommendations
    - Segment characteristics
    """
    if not model_service.is_ready():
        raise HTTPException(
            status_code=503,
            detail="ML models not loaded. Please ensure models are trained and available."
        )
    
    try:
        prediction = model_service.predict(customer)
        return prediction
    except Exception as e:
        logger.error(f"Prediction error: {e}")
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")


@app.post("/batch-predict", response_model=BatchPredictionResponse, tags=["Predictions"])
async def batch_predict(request: BatchPredictionRequest):
    """
    Predict segments for multiple customers in a single request.
    
    **Limits:**
    - Maximum 100 customers per batch
    - Rate limiting applies
    
    **Use Cases:**
    - Bulk customer analysis
    - Data migration
    - Batch processing workflows
    """
    if not model_service.is_ready():
        raise HTTPException(
            status_code=503,
            detail="ML models not loaded"
        )
    
    start_time = time()
    predictions = []
    
    try:
        for customer in request.customers:
            prediction = model_service.predict(customer)
            predictions.append(prediction)
        
        processing_time = (time() - start_time) * 1000
        
        return BatchPredictionResponse(
            predictions=predictions,
            total_processed=len(predictions),
            processing_time_ms=round(processing_time, 2)
        )
        
    except Exception as e:
        logger.error(f"Batch prediction error: {e}")
        raise HTTPException(status_code=500, detail=f"Batch prediction failed: {str(e)}")


@app.get("/metrics", tags=["Monitoring"])
async def get_metrics():
    """Get API metrics and statistics."""
    uptime = (datetime.utcnow() - startup_time).total_seconds()
    
    return {
        "uptime_seconds": round(uptime, 2),
        "model_status": "loaded" if model_service.is_ready() else "not_loaded",
        "model_load_time": model_service.load_time.isoformat() if model_service.load_time else None,
        "version": settings.app_version
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "api.main_v2:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug,
        log_level=settings.log_level.lower()
    )
