"""
Clustering models for customer segmentation.
"""
import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from typing import Tuple, List
import joblib


class CustomerSegmentation:
    """K-Means clustering model for customer segmentation."""
    
    def __init__(self, random_state: int = 42):
        self.random_state = random_state
        self.model = None
        self.optimal_k = None
        self.inertias = []
        
    def find_optimal_clusters(self, X: np.ndarray, k_range: range = range(2, 11)) -> Tuple[int, List[float]]:
        """
        Use Elbow Method to find optimal number of clusters.
        
        Args:
            X: Scaled feature matrix
            k_range: Range of k values to test
            
        Returns:
            Tuple of (optimal_k, list of inertias)
        """
        self.inertias = []
        
        for k in k_range:
            kmeans = KMeans(n_clusters=k, random_state=self.random_state, n_init=10)
            kmeans.fit(X)
            self.inertias.append(kmeans.inertia_)
        
        # Simple elbow detection: find point of maximum curvature
        # Using second derivative approximation
        if len(self.inertias) >= 3:
            second_derivatives = []
            for i in range(1, len(self.inertias) - 1):
                second_deriv = self.inertias[i-1] - 2*self.inertias[i] + self.inertias[i+1]
                second_derivatives.append(second_deriv)
            
            # Find the elbow (maximum second derivative)
            elbow_idx = second_derivatives.index(max(second_derivatives)) + 1
            self.optimal_k = list(k_range)[elbow_idx]
        else:
            self.optimal_k = 4  # Default fallback
        
        return self.optimal_k, self.inertias
    
    def plot_elbow(self, k_range: range = range(2, 11), figsize=(10, 6)):
        """Plot the elbow curve."""
        if not self.inertias:
            raise ValueError("Run find_optimal_clusters first")
        
        plt.figure(figsize=figsize)
        plt.plot(list(k_range), self.inertias, 'bo-', linewidth=2, markersize=8)
        
        if self.optimal_k:
            optimal_idx = list(k_range).index(self.optimal_k)
            plt.plot(self.optimal_k, self.inertias[optimal_idx], 'ro', markersize=12, 
                    label=f'Optimal k={self.optimal_k}')
        
        plt.xlabel('Number of Clusters (k)')
        plt.ylabel('Inertia (Within-Cluster Sum of Squares)')
        plt.title('Elbow Method for Optimal k')
        plt.grid(True, alpha=0.3)
        plt.legend()
        plt.tight_layout()
        return plt.gcf()
    
    def fit(self, X: np.ndarray, n_clusters: int = None):
        """
        Fit K-Means model.
        
        Args:
            X: Scaled feature matrix
            n_clusters: Number of clusters (uses optimal_k if None)
        """
        if n_clusters is None:
            if self.optimal_k is None:
                raise ValueError("Either provide n_clusters or run find_optimal_clusters first")
            n_clusters = self.optimal_k
        
        self.model = KMeans(n_clusters=n_clusters, random_state=self.random_state, n_init=10)
        self.model.fit(X)
        
        return self
    
    def predict(self, X: np.ndarray) -> np.ndarray:
        """Predict cluster labels for new data."""
        if self.model is None:
            raise ValueError("Model not fitted. Call fit() first.")
        return self.model.predict(X)
    
    def get_cluster_centers(self) -> np.ndarray:
        """Get cluster centroids."""
        if self.model is None:
            raise ValueError("Model not fitted. Call fit() first.")
        return self.model.cluster_centers_
    
    def save_model(self, filepath: str):
        """Save the trained model to disk."""
        if self.model is None:
            raise ValueError("Model not fitted. Call fit() first.")
        joblib.dump(self, filepath)
    
    @staticmethod
    def load_model(filepath: str):
        """Load a trained model from disk."""
        return joblib.load(filepath)
    
    def get_metrics(self) -> dict:
        """Get model performance metrics."""
        if self.model is None:
            raise ValueError("Model not fitted. Call fit() first.")
        
        return {
            'n_clusters': self.model.n_clusters,
            'inertia': self.model.inertia_,
            'n_iter': self.model.n_iter_
        }
