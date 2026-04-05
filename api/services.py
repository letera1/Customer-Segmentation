"""
Business logic and services layer.
"""
import joblib
import numpy as np
from pathlib import Path
from typing import Optional, Tuple
import logging
from datetime import datetime

from .models import CustomerInput, PredictionResponse, SegmentProfile
from .config import get_settings

logger = logging.getLogger(__name__)


class ModelService:
    """Service for ML model operations."""
    
    def __init__(self):
        self.model = None
        self.scaler = None
        self.settings = get_settings()
        self.load_time: Optional[datetime] = None
        
    def load_models(self) -> Tuple[bool, str]:
        """Load ML model and scaler."""
        try:
            if self.settings.model_path.exists():
                self.model = joblib.load(self.settings.model_path)
                logger.info(f"Model loaded from {self.settings.model_path}")
            else:
                return False, f"Model not found at {self.settings.model_path}"
                
            if self.settings.scaler_path.exists():
                self.scaler = joblib.load(self.settings.scaler_path)
                logger.info(f"Scaler loaded from {self.settings.scaler_path}")
            else:
                return False, f"Scaler not found at {self.settings.scaler_path}"
            
            self.load_time = datetime.utcnow()
            return True, "Models loaded successfully"
            
        except Exception as e:
            logger.error(f"Error loading models: {e}")
            return False, str(e)
    
    def is_ready(self) -> bool:
        """Check if models are loaded and ready."""
        return self.model is not None and self.scaler is not None
    
    def predict(self, customer: CustomerInput) -> PredictionResponse:
        """Predict customer segment."""
        if not self.is_ready():
            raise RuntimeError("Models not loaded")
        
        # Prepare features
        features = np.array([[
            customer.age,
            customer.annual_income,
            customer.spending_score
        ]])
        
        # Scale and predict
        features_scaled = self.scaler.transform(features)
        cluster_id = int(self.model.predict(features_scaled)[0])
        
        # Calculate confidence (distance to cluster center)
        distances = self.model.transform(features_scaled)[0]
        confidence = 1.0 / (1.0 + distances[cluster_id])
        
        # Get segment info
        segment_info = SegmentService.get_segment_info(cluster_id)
        
        return PredictionResponse(
            cluster_id=cluster_id,
            segment_name=segment_info['name'],
            segment_description=segment_info['description'],
            marketing_strategy=segment_info['strategy'],
            confidence=round(confidence, 3)
        )


class SegmentService:
    """Service for segment information."""
    
    SEGMENTS = {
        0: {
            'name': 'Budget Conscious',
            'description': 'Price-sensitive customers seeking value and deals',
            'strategy': 'Discount campaigns, loyalty rewards, bundle offers',
            'characteristics': {
                'income_level': 'Low to Moderate',
                'spending_pattern': 'Conservative',
                'price_sensitivity': 'High',
                'loyalty_potential': 'Medium'
            }
        },
        1: {
            'name': 'Premium Customers',
            'description': 'High-value customers with strong purchasing power',
            'strategy': 'VIP programs, exclusive products, premium services',
            'characteristics': {
                'income_level': 'High',
                'spending_pattern': 'Generous',
                'price_sensitivity': 'Low',
                'loyalty_potential': 'High'
            }
        },
        2: {
            'name': 'Growth Potential',
            'description': 'High-income customers with untapped spending potential',
            'strategy': 'Personalized engagement, product discovery, incentives',
            'characteristics': {
                'income_level': 'High',
                'spending_pattern': 'Conservative',
                'price_sensitivity': 'Medium',
                'loyalty_potential': 'High'
            }
        },
        3: {
            'name': 'Standard Customers',
            'description': 'Balanced customers with moderate income and spending',
            'strategy': 'Regular promotions, cross-selling, retention programs',
            'characteristics': {
                'income_level': 'Moderate',
                'spending_pattern': 'Balanced',
                'price_sensitivity': 'Medium',
                'loyalty_potential': 'Medium'
            }
        },
        4: {
            'name': 'Emerging Segment',
            'description': 'Young customers building their purchasing habits',
            'strategy': 'Digital engagement, trend-focused campaigns, growth nurturing',
            'characteristics': {
                'income_level': 'Low to Moderate',
                'spending_pattern': 'Selective',
                'price_sensitivity': 'Medium',
                'loyalty_potential': 'High'
            }
        }
    }
    
    @classmethod
    def get_segment_info(cls, cluster_id: int) -> dict:
        """Get segment information by cluster ID."""
        return cls.SEGMENTS.get(cluster_id, cls.SEGMENTS[0])
    
    @classmethod
    def get_all_segments(cls) -> list[SegmentProfile]:
        """Get all segment profiles."""
        segments = []
        for cluster_id, info in cls.SEGMENTS.items():
            segments.append(SegmentProfile(
                cluster_id=cluster_id,
                name=info['name'],
                description=info['description'],
                strategy=info['strategy'],
                characteristics=info['characteristics']
            ))
        return segments


# Global service instances
model_service = ModelService()
