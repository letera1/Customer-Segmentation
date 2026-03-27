"""Generate the complete Jupyter notebook for customer segmentation."""
import json

notebook = {
    "cells": [],
    "metadata": {
        "kernelspec": {
            "display_name": "Python 3",
            "language": "python",
            "name": "python3"
        },
        "language_info": {
            "name": "python",
            "version": "3.11.0"
        }
    },
    "nbformat": 4,
    "nbformat_minor": 4
}

# Cell 1: Title and Introduction
notebook["cells"].append({
    "cell_type": "markdown",
    "metadata": {},
    "source": [
        "# Customer Segmentation System\\n",
        "## End-to-End ML Solution for Marketing Intelligence\\n",
        "\\n",
        "**Author**: Senior ML Engineer  \\n",
        "**Objective**: Build a production-ready customer segmentation system using K-Means clustering\\n",
        "\\n",
        "### Business Context\\n",
        "This notebook implements a complete customer segmentation pipeline that:\\n",
        "- Identifies distinct customer groups based on behavior and demographics\\n",
        "- Provides actionable insights for targeted marketing campaigns\\n",
        "- Serves as the ML core for a full-stack deployment system\\n",
        "\\n",
        "### Workflow\\n",
        "1. Data Loading & Validation\\n",
        "2. Exploratory Data Analysis (EDA)\\n",
        "3. Feature Engineering & Scaling\\n",
        "4. Optimal Cluster Selection (Elbow Method)\\n",
        "5. K-Means Clustering\\n",
        "6. Cluster Profiling & Business Insights\\n",
        "7. Model Persistence & Deployment Prep"
    ]
})

# Cell 2: Imports
notebook["cells"].append({
    "cell_type": "code",
    "execution_count": None,
    "metadata": {},
    "outputs": [],
    "source": [
        "# Import libraries\\n",
        "import sys\\n",
        "sys.path.append('..')\\n",
        "\\n",
        "import pandas as pd\\n",
        "import numpy as np\\n",
        "import matplotlib.pyplot as plt\\n",
        "import seaborn as sns\\n",
        "from sklearn.preprocessing import StandardScaler\\n",
        "import warnings\\n",
        "warnings.filterwarnings('ignore')\\n",
        "\\n",
        "# Import custom modules\\n",
        "from src.data_processing import DataProcessor\\n",
        "from src.modeling import CustomerSegmentation\\n",
        "from src.utils import setup_plot_style, save_cluster_report, plot_cluster_distribution, get_segment_names\\n",
        "\\n",
        "# Setup\\n",
        "setup_plot_style()\\n",
        "%matplotlib inline\\n",
        "\\n",
        "print(\\\"✓ Environment ready\\\")"
    ]
})

# Cell 3: Data Loading Section
notebook["cells"].append({
    "cell_type": "markdown",
    "metadata": {},
    "source": [
        "## 1. Data Loading & Initial Validation\\n",
        "\\n",
        "We'll use the Mall Customers dataset containing:\\n",
        "- CustomerID: Unique identifier\\n",
        "- Gender: Male/Female\\n",
        "- Age: Customer age\\n",
        "- Annual Income (k$): Yearly income in thousands\\n",
        "- Spending Score (1-100): Score assigned based on spending behavior"
    ]
})

# Save the notebook
with open('notebooks/customer_segmentation.ipynb', 'w') as f:
    json.dump(notebook, f, indent=1)

print("Notebook structure created successfully!")
