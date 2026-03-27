"""
FastAPI backend for customer segmentation predictions.
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Dict
import joblib
import numpy as np
import pandas as pd
from pathlib import Path

app = FastAPI(
    title="Customer Segmentation API",
    description="REST API for customer segment predictions",
    version="1.0.0"
)

# CORS middleware for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model and scaler at startup
MODEL_PATH = Path("../data/outputs/segmentation_model.pkl")
SCALER_PATH = Path("../data/outputs/scaler.pkl")

model = None
scaler = None

@app.on_event("startup")
async def load_model():
    """Load trained model and scaler on startup."""
    global model, scaler
    try:
        if MODEL_PATH.exists():
            model = joblib.load(MODEL_PATH)
            print("✓ Model loaded successfully")
        if SCALER_PATH.exists():
            scaler = joblib.load(SCALER_PATH)
            print("✓ Scaler loaded successfully")
    except Exception as e:
        print(f"Warning: Could not load model/scaler: {e}")


class CustomerInput(BaseModel):
    """Input schema for customer data."""
    age: int = Field(..., ge=18, le=100, description="Customer age")
    annual_income: float = Field(..., ge=0, description="Annual income in thousands")
    spending_score: int = Field(..., ge=1, le=100, description="Spending score (1-100)")
    
    class Config:
        json_schema_extra = {
            "example": {
                "age": 35,
                "annual_income": 75.0,
                "spending_score": 65
            }
        }


class PredictionResponse(BaseModel):
    """Response schema for predictions."""
    cluster_id: int
    segment_name: str
    segment_description: str
    marketing_strategy: str
    confidence: str


class SegmentProfile(BaseModel):
    """Schema for segment profile information."""
    cluster_id: int
    name: str
    description: str
    strategy: str


# Segment definitions
SEGMENTS = {
    0: {
        'name': 'Budget Conscious',
        'description': 'Low income, low spending - price-sensitive customers',
        'strategy': 'Discount campaigns, loyalty programs, value bundles'
    },
    1: {
        'name': 'High Value',
        'description': 'High income, high spending - premium customers',
        'strategy': 'VIP programs, premium products, personalized service'
    },
    2: {
        'name': 'Potential Growth',
        'description': 'High income, low spending - untapped potential',
        'strategy': 'Engagement campaigns, product recommendations, incentives'
    },
    3: {
        'name': 'Average Customers',
        'description': 'Moderate income and spending - stable base',
        'strategy': 'Regular promotions, cross-selling, retention programs'
    },
    4: {
        'name': 'Young Savers',
        'description': 'Young age, moderate spending - future potential',
        'strategy': 'Youth-focused campaigns, digital engagement, growth nurturing'
    }
}


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "message": "Customer Segmentation API",
        "version": "1.0.0",
        "endpoints": {
            "predict": "/predict",
            "segments": "/segments",
            "health": "/health"
        }
    }


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "model_loaded": model is not None,
        "scaler_loaded": scaler is not None
    }


@app.post("/predict", response_model=PredictionResponse)
async def predict_segment(customer: CustomerInput):
    """
    Predict customer segment based on input features.
    
    Args:
        customer: Customer data (age, income, spending score)
        
    Returns:
        Prediction with segment details and marketing strategy
    """
    if model is None or scaler is None:
        raise HTTPException(
            status_code=503,
            detail="Model not loaded. Please train the model first."
        )
    
    try:
        # Prepare features
        features = np.array([[
            customer.age,
            customer.annual_income,
            customer.spending_score
        ]])
        
        # Scale features
        features_scaled = scaler.transform(features)
        
        # Predict cluster
        cluster_id = int(model.predict(features_scaled)[0])
        
        # Get segment info
        segment_info = SEGMENTS.get(cluster_id, SEGMENTS[0])
        
        return PredictionResponse(
            cluster_id=cluster_id,
            segment_name=segment_info['name'],
            segment_description=segment_info['description'],
            marketing_strategy=segment_info['strategy'],
            confidence="high"
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")


@app.get("/segments", response_model=List[SegmentProfile])
async def get_segments():
    """
    Get all available customer segments with descriptions.
    
    Returns:
        List of all segment profiles
    """
    segments = []
    for cluster_id, info in SEGMENTS.items():
        segments.append(SegmentProfile(
            cluster_id=cluster_id,
            name=info['name'],
            description=info['description'],
            strategy=info['strategy']
        ))
    return segments


@app.post("/batch-predict")
async def batch_predict(customers: List[CustomerInput]):
    """
    Predict segments for multiple customers.
    
    Args:
        customers: List of customer data
        
    Returns:
        List of predictions
    """
    if model is None or scaler is None:
        raise HTTPException(
            status_code=503,
            detail="Model not loaded. Please train the model first."
        )
    
    predictions = []
    for customer in customers:
        result = await predict_segment(customer)
        predictions.append(result)
    
    return predictions


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
