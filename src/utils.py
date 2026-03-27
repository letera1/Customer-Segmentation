"""
Utility functions for customer segmentation project.
"""
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from typing import Dict, List, Tuple
import json


def setup_plot_style():
    """Configure matplotlib and seaborn styling."""
    plt.style.use('seaborn-v0_8-darkgrid')
    sns.set_palette("husl")
    plt.rcParams['figure.figsize'] = (12, 6)
    plt.rcParams['font.size'] = 10


def save_cluster_report(df: pd.DataFrame, cluster_col: str, output_path: str):
    """
    Generate and save a cluster profiling report.
    
    Args:
        df: DataFrame with cluster assignments
        cluster_col: Name of the cluster column
        output_path: Path to save the report
    """
    report = {}
    
    for cluster_id in sorted(df[cluster_col].unique()):
        cluster_data = df[df[cluster_col] == cluster_id]
        
        profile = {
            'cluster_id': int(cluster_id),
            'size': len(cluster_data),
            'percentage': round(len(cluster_data) / len(df) * 100, 2),
            'statistics': {}
        }
        
        # Calculate statistics for numeric columns
        numeric_cols = df.select_dtypes(include=[np.number]).columns
        numeric_cols = [col for col in numeric_cols if col != cluster_col]
        
        for col in numeric_cols:
            profile['statistics'][col] = {
                'mean': round(cluster_data[col].mean(), 2),
                'median': round(cluster_data[col].median(), 2),
                'std': round(cluster_data[col].std(), 2)
            }
        
        report[f'cluster_{cluster_id}'] = profile
    
    with open(output_path, 'w') as f:
        json.dump(report, f, indent=2)
    
    return report


def plot_cluster_distribution(df: pd.DataFrame, cluster_col: str, figsize=(10, 6)):
    """Plot the distribution of samples across clusters."""
    plt.figure(figsize=figsize)
    cluster_counts = df[cluster_col].value_counts().sort_index()
    
    plt.bar(cluster_counts.index, cluster_counts.values, color='steelblue', alpha=0.7)
    plt.xlabel('Cluster')
    plt.ylabel('Number of Customers')
    plt.title('Customer Distribution Across Clusters')
    plt.xticks(cluster_counts.index)
    
    for i, v in enumerate(cluster_counts.values):
        plt.text(cluster_counts.index[i], v + 5, str(v), ha='center', va='bottom')
    
    plt.tight_layout()
    return plt.gcf()


def get_segment_names() -> Dict[int, Dict[str, str]]:
    """
    Define business-friendly names and descriptions for each segment.
    
    Returns:
        Dictionary mapping cluster IDs to segment info
    """
    return {
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
