# Customer Segmentation System

A production-ready, end-to-end customer segmentation solution using K-Means clustering with full-stack deployment capabilities.

Built by a senior ML engineer with enterprise-grade architecture, clean code practices, and deployment readiness.

## 🎯 Project Overview

This system provides:
- **ML Pipeline**: Complete data processing, clustering, and model persistence
- **REST API**: FastAPI backend for real-time segment predictions
- **Modern Dashboard**: Next.js 16 frontend with TypeScript and Tailwind CSS
- **Business Intelligence**: Actionable marketing strategies per customer segment

## 📁 Project Structure

```
customer-segmentation/
├── data/                      # Data storage
│   ├── raw/                   # Original datasets
│   ├── processed/             # Cleaned and transformed data
│   └── outputs/               # Cluster results, models, reports
├── notebooks/                 # Jupyter notebooks for analysis
│   └── customer_segmentation.ipynb  # Complete ML workflow
├── src/                       # Core ML logic (modular, reusable)
│   ├── data_processing.py     # Data cleaning and preprocessing
│   ├── modeling.py            # K-Means clustering implementation
│   └── utils.py               # Visualization and reporting utilities
├── api/                       # FastAPI backend
│   ├── main.py                # REST API endpoints
│   └── README.md              # API documentation
├── frontend/                  # Next.js 16 dashboard
│   ├── app/                   # App router (page.tsx, layout.tsx)
│   ├── components/            # React components
│   │   ├── SegmentationForm.tsx
│   │   ├── ResultCard.tsx
│   │   └── SegmentsList.tsx
│   └── README.md              # Frontend documentation
├── requirements.txt           # Python dependencies
├── ARCHITECTURE.md            # System design documentation
├── DEPLOYMENT.md              # Deployment guide
├── GETTING_STARTED.md         # Complete tutorial
├── run_project.py             # Automated setup script
└── test_api.py                # API testing script
```

## ✨ Features

### Machine Learning
- **Elbow Method**: Automated optimal cluster selection
- **K-Means Clustering**: Scalable customer segmentation
- **Feature Engineering**: StandardScaler normalization
- **Model Persistence**: Joblib serialization for production

### Backend API
- **FastAPI**: High-performance async REST API
- **Pydantic Validation**: Type-safe request/response models
- **CORS Support**: Frontend integration ready
- **Health Checks**: Monitoring endpoints

### Frontend Dashboard
- **Next.js 16**: Modern React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Responsive, beautiful UI
- **Interactive Forms**: Range sliders for customer input
- **Real-time Predictions**: Instant segment classification

### Business Intelligence
- **5 Customer Segments**: Budget Conscious, High Value, Potential Growth, Average, Young Savers
- **Marketing Strategies**: Tailored recommendations per segment
- **Visual Analytics**: Distribution plots, cluster visualization
- **JSON Reports**: Exportable segment profiles

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 18+
- pip and npm

### Step 1: Install Python Dependencies
```bash
pip install -r requirements.txt
```

### Step 2: Train the Model
```bash
# Open Jupyter notebook
jupyter notebook notebooks/customer_segmentation.ipynb

# Execute all cells to:
# - Generate sample customer data
# - Perform EDA with visualizations
# - Train K-Means clustering model
# - Save model artifacts to data/outputs/
```

### Step 3: Start API Server
```bash
cd api
uvicorn main:app --reload
```
API available at: `http://localhost:8000`
- Interactive docs: `http://localhost:8000/docs`

### Step 4: Launch Frontend
```bash
cd frontend
npm install
npm run dev
```
Dashboard available at: `http://localhost:3000`

### Step 5: Test the System
```bash
python test_api.py
```

## 📊 Customer Segments

| Segment | Description | Marketing Strategy |
|---------|-------------|-------------------|
| **Budget Conscious** | Low income, low spending | Discount campaigns, loyalty programs, value bundles |
| **High Value** | High income, high spending | VIP programs, premium products, personalized service |
| **Potential Growth** | High income, low spending | Engagement campaigns, product recommendations, incentives |
| **Average Customers** | Moderate income and spending | Regular promotions, cross-selling, retention programs |
| **Young Savers** | Young age, moderate spending | Youth-focused campaigns, digital engagement |

## 🔌 API Endpoints

### POST /predict
Predict customer segment

**Request:**
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
List all available segments with strategies

### GET /health
Health check and model status

## 🛠️ Tech Stack

**Machine Learning:**
- scikit-learn (K-Means, StandardScaler)
- pandas, numpy (data processing)
- matplotlib, seaborn (visualization)
- joblib (model persistence)

**Backend:**
- FastAPI (REST API framework)
- Pydantic (data validation)
- uvicorn (ASGI server)

**Frontend:**
- Next.js 16 (React framework)
- TypeScript (type safety)
- Tailwind CSS (styling)
- React 19 (UI library)

## 📈 Business Value

This system enables marketing teams to:
- ✅ Identify high-value customer segments automatically
- ✅ Personalize marketing campaigns based on behavior
- ✅ Optimize marketing budget allocation
- ✅ Improve customer retention with targeted strategies
- ✅ Make data-driven decisions with confidence

## 🏗️ Architecture

See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed system design, data flow, and scalability considerations.

## 🚢 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment guides including Docker, AWS, GCP, and Vercel options.

## 📚 Documentation

- **[GETTING_STARTED.md](GETTING_STARTED.md)** - Complete step-by-step tutorial
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System design and architecture
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deployment strategies
- **[api/README.md](api/README.md)** - API documentation
- **[frontend/README.md](frontend/README.md)** - Frontend documentation

## 🧪 Testing

```bash
# Test API endpoints
python test_api.py

# Run with custom data
# Edit notebooks/customer_segmentation.ipynb with your CSV file
```

## 📝 Code Quality

- **Modular Design**: Separation of concerns (data, model, API, UI)
- **Type Safety**: TypeScript frontend, Pydantic backend
- **Clean Code**: PEP 8 compliant, documented functions
- **Reusable Components**: DRY principles throughout
- **Production Ready**: Error handling, logging, validation

## 🎓 Learning Outcomes

This project demonstrates:
- End-to-end ML pipeline development
- Production-grade API design
- Modern full-stack architecture
- Business-focused ML applications
- Clean, maintainable code practices

---

**Built with ❤️ by a Senior ML Engineer**

For questions or improvements, feel free to open an issue or submit a PR.
