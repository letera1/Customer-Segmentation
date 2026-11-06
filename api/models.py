"""
Pydantic models for request/response validation.
"""
from pydantic import BaseModel, Field, field_validator, ConfigDict
from typing import Optional, List, Dict, Any
from datetime import datetime, timezone


class CustomerInput(BaseModel):
    """Input schema for customer data."""
    age: int = Field(..., ge=18, le=100, description="Customer age (18-100)")
    annual_income: float = Field(..., ge=0, le=500, description="Annual income in thousands")
    spending_score: int = Field(..., ge=1, le=100, description="Spending score (1-100)")
    
    @field_validator("age")
    @classmethod
    def validate_age(cls, v: int) -> int:
        if not 18 <= v <= 100:
            raise ValueError("Age must be between 18 and 100")
        return v
    
    @field_validator("spending_score")
    @classmethod
    def validate_spending(cls, v: int) -> int:
        if not 1 <= v <= 100:
            raise ValueError("Spending score must be between 1 and 100")
        return v
    
    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "age": 35,
                "annual_income": 75.0,
                "spending_score": 65,
            }
        }
    )


class PredictionResponse(BaseModel):
    """Response schema for predictions."""
    cluster_id: int
    segment_name: str
    segment_description: str
    marketing_strategy: str
    confidence: float
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    
    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "cluster_id": 1,
                "segment_name": "High Value",
                "segment_description": "High income, high spending customers",
                "marketing_strategy": "VIP programs, premium products",
                "confidence": 0.95,
                "timestamp": "2025-04-05T12:00:00Z",
            }
        }
    )


class SegmentProfile(BaseModel):
    """Schema for segment profile information."""
    cluster_id: int
    name: str
    description: str
    strategy: str
    characteristics: Dict[str, Any]
    target_percentage: Optional[float] = None


class BatchPredictionRequest(BaseModel):
    """Request schema for batch predictions."""
    customers: List[CustomerInput] = Field(..., max_length=100)
    
    @field_validator("customers")
    @classmethod
    def validate_batch_size(cls, v: List[CustomerInput]) -> List[CustomerInput]:
        if len(v) > 100:
            raise ValueError("Maximum 100 customers per batch")
        return v


class BatchPredictionResponse(BaseModel):
    """Response schema for batch predictions."""
    predictions: List[PredictionResponse]
    total_processed: int
    processing_time_ms: float


class HealthResponse(BaseModel):
    """Health check response."""
    status: str
    model_loaded: bool
    scaler_loaded: bool
    version: str
    uptime_seconds: float


class ErrorResponse(BaseModel):
    """Error response schema."""
    error: str
    detail: Optional[str] = None
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
