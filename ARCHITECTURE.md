# System Architecture

## Overview

This is a production-ready customer segmentation system built with a modern ML stack and full-stack deployment architecture.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend Layer                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Next.js 16 Dashboard (TypeScript + Tailwind CSS)   │  │
│  │  - Customer input forms                              │  │
│  │  - Real-time predictions                             │  │
│  │  - Segment visualization                             │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP/REST
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      API Layer                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  FastAPI Backend                                     │  │
│  │  - /predict endpoint                                 │  │
│  │  - /segments endpoint                                │  │
│  │  - Model serving                                     │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ joblib
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    ML Model Layer                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  K-Means Clustering Model                            │  │
│  │  - Trained model (.pkl)                              │  │
│  │  - StandardScaler (.pkl)                             │  │
│  │  - Feature preprocessing                             │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Data Layer                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  - Raw data (CSV)                                    │  │
│  │  - Processed data with clusters                      │  │
│  │  - Cluster reports (JSON)                            │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Component Details

### 1. Data Processing Layer (`src/data_processing.py`)

**Responsibilities:**
- Load and validate raw customer data
- Handle missing values and duplicates
- Feature scaling using StandardScaler
- Data quality checks

**Key Classes:**
- `DataProcessor`: Main class for data operations

### 2. ML Model Layer (`src/modeling.py`)

**Responsibilities:**
- K-Means clustering implementation
- Elbow method for optimal k selection
- Model training and prediction
- Model persistence

**Key Classes:**
- `CustomerSegmentation`: Clustering model wrapper

**Algorithm:**
- K-Means clustering with k=4-5 optimal clusters
- Features: Age, Annual Income, Spending Score
- Scaling: StandardScaler for feature normalization

### 3. API Layer (`api/main.py`)

**Technology:** FastAPI

**Endpoints:**
- `POST /predict`: Single customer prediction
- `POST /batch-predict`: Batch predictions
- `GET /segments`: List all segments
- `GET /health`: Health check

**Features:**
- CORS enabled for frontend integration
- Pydantic models for request/response validation
- Model loaded at startup for fast inference
- Error handling and logging

### 4. Frontend Layer (`frontend/`)

**Technology:** Next.js 16, React 19, TypeScript, Tailwind CSS

**Components:**
- `SegmentationForm`: Interactive input with range sliders
- `ResultCard`: Display prediction with styling
- `SegmentsList`: Show all available segments

**Features:**
- Server-side rendering (SSR)
- Responsive design
- Real-time API integration
- Type-safe development

## Data Flow

1. **Training Phase:**
   ```
   Raw Data → Data Cleaning → Feature Scaling → 
   Elbow Method → K-Means Training → Model Persistence
   ```

2. **Prediction Phase:**
   ```
   User Input (Frontend) → API Request → 
   Feature Scaling → Model Prediction → 
   Segment Mapping → Response (Frontend)
   ```

## Deployment Strategy

### Development
```bash
# Terminal 1: Start API
cd api
uvicorn main:app --reload

# Terminal 2: Start Frontend
cd frontend
npm run dev
```

### Production

**Option 1: Docker Compose**
```yaml
services:
  api:
    build: ./api
    ports:
      - "8000:8000"
  
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - api
```

**Option 2: Cloud Deployment**
- API: AWS Lambda + API Gateway / Google Cloud Run
- Frontend: Vercel / Netlify
- Model: S3 / Cloud Storage

## Scalability Considerations

1. **Horizontal Scaling:**
   - Stateless API design allows multiple instances
   - Load balancer for traffic distribution

2. **Model Updates:**
   - Retrain model periodically with new data
   - Blue-green deployment for zero downtime

3. **Caching:**
   - Redis for frequent predictions
   - CDN for frontend assets

4. **Monitoring:**
   - API metrics (latency, throughput)
   - Model performance (accuracy, drift)
   - User analytics

## Security

- Input validation with Pydantic
- CORS configuration for trusted origins
- Rate limiting for API endpoints
- HTTPS in production
- Environment variables for secrets

## Performance

- Model loading at startup (not per request)
- Efficient numpy operations
- Async API endpoints
- Frontend code splitting
- Image optimization

## Future Enhancements

1. **ML Improvements:**
   - Try other algorithms (DBSCAN, Hierarchical)
   - Feature engineering (RFM analysis)
   - Automated hyperparameter tuning

2. **System Features:**
   - User authentication
   - Historical predictions storage
   - A/B testing framework
   - Real-time model retraining

3. **Analytics:**
   - Segment evolution tracking
   - Campaign performance metrics
   - Customer journey analysis
