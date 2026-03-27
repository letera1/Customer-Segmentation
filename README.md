# Customer Segmentation System

A production-ready customer segmentation solution using K-Means clustering with full-stack deployment capabilities.

## Project Structure

```
customer-segmentation/
├── data/                      # Data storage
│   ├── raw/                   # Original datasets
│   ├── processed/             # Cleaned and transformed data
│   └── outputs/               # Cluster results and reports
├── notebooks/                 # Jupyter notebooks for analysis
│   └── customer_segmentation.ipynb
├── src/                       # Core ML logic
│   ├── data_processing.py     # Data cleaning and preprocessing
│   ├── modeling.py            # Clustering models
│   └── utils.py               # Helper functions
├── api/                       # FastAPI backend
│   ├── main.py                # API endpoints
│   ├── models.py              # Pydantic models
│   └── predictor.py           # Prediction logic
├── frontend/                  # Next.js 16 dashboard
│   ├── app/                   # App router
│   ├── components/            # React components
│   └── lib/                   # Utilities
└── requirements.txt           # Python dependencies
```

## Features

- **EDA & Visualization**: Comprehensive exploratory data analysis
- **K-Means Clustering**: Optimal cluster identification using Elbow Method
- **Business Insights**: Actionable marketing strategies per segment
- **REST API**: FastAPI backend for real-time predictions
- **Modern UI**: Next.js 16 dashboard with TypeScript and Tailwind CSS

## Quick Start

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Run Jupyter Notebook
```bash
jupyter notebook notebooks/customer_segmentation.ipynb
```

### 3. Start API Server
```bash
cd api
uvicorn main:app --reload
```

### 4. Launch Frontend
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

- `POST /predict` - Predict customer segment
- `GET /segments` - Get all segment profiles
- `GET /health` - Health check

## Tech Stack

- **ML**: scikit-learn, pandas, numpy
- **Visualization**: matplotlib, seaborn
- **Backend**: FastAPI, Pydantic
- **Frontend**: Next.js 16, TypeScript, Tailwind CSS
- **Data**: CSV, pickle for model persistence

## Business Value

This system enables marketing teams to:
- Identify high-value customer segments
- Personalize marketing campaigns
- Optimize resource allocation
- Improve customer retention strategies
