# Customer Segmentation API

FastAPI backend for serving customer segmentation predictions.

## Setup

```bash
cd api
pip install -r ../requirements.txt
```

## Run Server

```bash
uvicorn main:app --reload
```

Server will start at `http://localhost:8000`

## API Documentation

Interactive docs available at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Endpoints

### POST /predict
Predict customer segment

**Request Body:**
```json
{
  "age": 35,
  "annual_income": 75.0,
  "spending_score": 65
}
```

**Response:**
```json
{
  "cluster_id": 1,
  "segment_name": "High Value",
  "segment_description": "High income, high spending - premium customers",
  "marketing_strategy": "VIP programs, premium products, personalized service",
  "confidence": "high"
}
```

### GET /segments
Get all segment profiles

### GET /health
Health check endpoint
