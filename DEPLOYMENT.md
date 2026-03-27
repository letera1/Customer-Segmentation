# Deployment Guide

## Quick Start

### 1. Install Dependencies

```bash
# Python dependencies
pip install -r requirements.txt

# Frontend dependencies
cd frontend
npm install
cd ..
```

### 2. Train the Model

```bash
# Run Jupyter notebook
jupyter notebook notebooks/customer_segmentation.ipynb

# Execute all cells to:
# - Generate sample data
# - Train clustering model
# - Save model artifacts
```

### 3. Start API Server

```bash
cd api
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

API will be available at `http://localhost:8000`
- Docs: `http://localhost:8000/docs`

### 4. Start Frontend

```bash
cd frontend
npm run dev
```

Dashboard will be available at `http://localhost:3000`

## Production Deployment

### Docker Deployment

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  api:
    build:
      context: .
      dockerfile: api/Dockerfile
    ports:
      - "8000:8000"
    volumes:
      - ./data:/app/data
    environment:
      - PYTHONUNBUFFERED=1
  
  frontend:
    build:
      context: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - api
    environment:
      - NEXT_PUBLIC_API_URL=http://api:8000
```

Run: `docker-compose up`

### Cloud Deployment Options

**AWS:**
- API: Elastic Beanstalk / ECS
- Frontend: Amplify / S3 + CloudFront
- Model: S3 bucket

**Google Cloud:**
- API: Cloud Run
- Frontend: Firebase Hosting
- Model: Cloud Storage

**Vercel + Railway:**
- Frontend: Vercel
- API: Railway
