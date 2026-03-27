"""
Data processing module for customer segmentation.
"""
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from typing import Tuple, List


class DataProcessor:
    """Handle data loading, cleaning, and preprocessing."""
    
    def __init__(self):
        self.scaler = StandardScaler()
        self.feature_columns = None
        
    def load_data(self, filepath: str) -> pd.DataFrame:
        """Load dataset from CSV file."""
        df = pd.read_csv(filepath)
        return df
    
    def clean_data(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Clean the dataset by handling missing values and validating types.
        
        Args:
            df: Raw dataframe
            
        Returns:
            Cleaned dataframe
        """
        df_clean = df.copy()
        
        # Handle missing values
        if df_clean.isnull().sum().sum() > 0:
            # For numeric columns, fill with median
            numeric_cols = df_clean.select_dtypes(include=[np.number]).columns
            for col in numeric_cols:
                if df_clean[col].isnull().sum() > 0:
                    df_clean[col].fillna(df_clean[col].median(), inplace=True)
            
            # For categorical columns, fill with mode
            cat_cols = df_clean.select_dtypes(include=['object']).columns
            for col in cat_cols:
                if df_clean[col].isnull().sum() > 0:
                    df_clean[col].fillna(df_clean[col].mode()[0], inplace=True)
        
        # Remove duplicates
        df_clean = df_clean.drop_duplicates()
        
        return df_clean
    
    def prepare_features(self, df: pd.DataFrame, feature_cols: List[str]) -> Tuple[pd.DataFrame, np.ndarray]:
        """
        Prepare features for clustering by scaling.
        
        Args:
            df: Cleaned dataframe
            feature_cols: List of column names to use as features
            
        Returns:
            Tuple of (original df, scaled features array)
        """
        self.feature_columns = feature_cols
        
        # Extract features
        X = df[feature_cols].values
        
        # Scale features
        X_scaled = self.scaler.fit_transform(X)
        
        return df, X_scaled
    
    def inverse_transform(self, X_scaled: np.ndarray) -> np.ndarray:
        """Inverse transform scaled features back to original scale."""
        return self.scaler.inverse_transform(X_scaled)
    
    def get_data_summary(self, df: pd.DataFrame) -> dict:
        """Generate summary statistics for the dataset."""
        summary = {
            'shape': df.shape,
            'columns': list(df.columns),
            'dtypes': df.dtypes.to_dict(),
            'missing_values': df.isnull().sum().to_dict(),
            'numeric_summary': df.describe().to_dict()
        }
        return summary
