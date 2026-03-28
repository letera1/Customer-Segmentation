<div align="center">

# 🎯 SegmentAI Pro

### Advanced Customer Segmentation Platform with AI-Powered Analytics

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.13-3776AB?style=for-the-badge&logo=python)](https://www.python.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

<img src="https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge" alt="Status">
<img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License">

[Features](#-features) • [Quick Start](#-quick-start) • [Demo](#-demo) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 🌟 Overview

**SegmentAI Pro** is a production-ready, enterprise-grade customer segmentation platform that combines machine learning with stunning data visualization. Built with modern technologies and best practices, it delivers actionable insights for data-driven marketing strategies.

### ✨ What Makes It Special

- 🎨 **Pixel-Perfect UI** - Modern dark-themed dashboard with smooth animations
- 🤖 **AI-Powered** - K-Means clustering with automated optimal k selection
- 📊 **Rich Analytics** - Interactive charts, heatmaps, and real-time metrics
- 🚀 **Production Ready** - Clean architecture, TypeScript, and scalable design
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- ⚡ **Lightning Fast** - Optimized performance with Next.js 15 and React 19

---

## 🎯 Features

### 🔮 Machine Learning Core
- **K-Means Clustering** with Elbow Method for optimal segmentation
- **5 Customer Segments**: Budget Conscious, High Value, Potential Growth, Average, Young Savers
- **Real-time Predictions** with confidence scoring
- **Model Persistence** using joblib for production deployment

### 📊 Analytics Dashboard
- **Interactive Charts**: Line charts, bar charts, circular progress, donut charts
- **KPI Cards**: Page views, monthly users, subscriptions, visit duration
- **Revenue Tracking**: Total balance with revenue/expense breakdown
- **User Analytics**: Software distribution, web traffic patterns
- **Activity Heatmaps**: 7-day activity visualization

### 👥 Customer Management
- **Data Table** with search, filter, and pagination
- **Customer Profiles** with segment assignments
- **Bulk Operations** for efficient management
- **Export Capabilities** (CSV, Excel, JSON)

### 📈 Advanced Analytics
- **Conversion Rate** tracking
- **User Flow** visualization
- **Device Breakdown** (Desktop, Mobile, Tablet)
- **Traffic Sources** analysis
- **Top Pages** performance metrics

### 📋 Reports Center
- **6 Report Templates**: Segment Analysis, Customer Insights, Performance, Trends, Revenue, Predictions
- **Scheduled Reports**: Weekly, Monthly, Quarterly automation
- **Multiple Formats**: PDF, Excel, CSV, JSON
- **Recent Reports** history with download

### 🎯 Segment Intelligence
- **Detailed Profiles** for each segment
- **Marketing Strategies** tailored per segment
- **Performance Metrics** and trends
- **Segment Comparison** tools

### � Prediction Engine
- **History Tracking** of all predictions
- **Batch Predictions** support
- **Confidence Scoring** for reliability
- **Export Predictions** for further analysis

### ⚙️ Settings & Configuration
- **API Configuration** management
- **Model Version** control
- **Data Management** tools
- **User Preferences** customization

---

## 🚀 Quick Start

### Prerequisites

```bash
✅ Python 3.8+
✅ Node.js 18+
✅ npm or yarn
```

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/segmentai-pro.git
cd segmentai-pro

# 2. Install Python dependencies
pip install -r requirements.txt

# 3. Install frontend dependencies
cd frontend
npm install
cd ..
```

### Training the Model

```bash
# Train the K-Means model (takes ~30 seconds)
python train_model.py
```

**Expected Output:**
```
✓ Created dataset with 200 customers
✓ Data cleaned: 200 records
✓ Features scaled
✓ Optimal k: 5
✓ Model trained successfully
✓ Model saved to data/outputs/segmentation_model.pkl
```

### Running the Application

**Terminal 1 - Start API Server:**
```bash
cd api
uvicorn main:app --reload
```
🌐 API: http://localhost:8000
📚 Docs: http://localhost:8000/docs

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm run dev
```
🎨 Dashboard: http://localhost:3000

---

## 📸 Demo

### Dashboard Overview
<img src="https://via.placeholder.com/1200x600/0B1120/3B82F6?text=Dashboard+Screenshot" alt="Dashboard" />

### Analytics Page
<img src="https://via.placeholder.com/1200x600/0B1120/8B5CF6?text=Analytics+Screenshot" alt="Analytics" />

### Customer Management
<img src="https://via.placeholder.com/1200x600/0B1120/10B981?text=Customers+Screenshot" alt="Customers" />

---

## 🏗️ Architecture

```
segmentai-pro/
├── 📊 data/
│   ├── raw/              # Original datasets
│   ├── processed/        # Cleaned data with clusters
│   └── outputs/          # Models, scalers, reports
├── 📓 notebooks/
│   └── customer_segmentation.ipynb
├── 🧠 src/
│   ├── data_processing.py    # Data cleaning & preprocessing
│   ├── modeling.py           # K-Means clustering
│   └── utils.py              # Visualization utilities
├── 🔌 api/
│   ├── main.py               # FastAPI endpoints
│   └── README.md
├── 🎨 frontend/
│   ├── app/
│   │   ├── dashboard/        # Main dashboard
│   │   ├── analytics/        # Advanced analytics
│   │   ├── reports/          # Reports center
│   │   ├── customers/        # Customer management
│   │   ├── segments/         # Segment profiles
│   │   ├── predictions/      # Prediction history
│   │   └── settings/         # Configuration
│   ├── components/
│   │   └── Layout.tsx        # Main layout wrapper
│   └── package.json
├── train_model.py            # Model training script
├── test_api.py              # API testing suite
└── requirements.txt
```

---

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern, fast web framework
- **scikit-learn** - Machine learning library
- **pandas** - Data manipulation
- **numpy** - Numerical computing
- **joblib** - Model persistence

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **SVG Charts** - Custom data visualization

### Machine Learning
- **K-Means Clustering** - Customer segmentation
- **StandardScaler** - Feature normalization
- **Elbow Method** - Optimal cluster selection

---

## 📡 API Endpoints

### Predictions
```http
POST /predict
Content-Type: application/json

{
  "age": 35,
  "annual_income": 75,
  "spending_score": 65
}
```

### Segments
```http
GET /segments
```

### Health Check
```http
GET /health
```

---

## 🎨 Customer Segments

| Segment | Description | Strategy |
|---------|-------------|----------|
| 💰 **Budget Conscious** | Low income, low spending | Discount campaigns, loyalty programs |
| 👑 **High Value** | High income, high spending | VIP programs, premium products |
| 🎯 **Potential Growth** | High income, low spending | Engagement campaigns, incentives |
| 👥 **Average** | Moderate income/spending | Regular promotions, cross-selling |
| 🌱 **Young Savers** | Young, moderate spending | Youth campaigns, digital engagement |

---

## 🧪 Testing

```bash
# Test API endpoints
python test_api.py

# Run with custom data
# Edit train_model.py with your CSV file
```

---

## 📚 Documentation

- [API Documentation](api/README.md)
- [Frontend Documentation](frontend/README.md)
- [Architecture Guide](ARCHITECTURE.md)
- [Deployment Guide](DEPLOYMENT.md)

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🌟 Acknowledgments

- Built by Letera 
- Author Letera Tujo 
- Email: leteratujo890@gmail.com
- Inspired by modern SaaS dashboards
- Powered by open-source technologies



<div align="center">

### ⭐ Star us on GitHub — it motivates us a lot!

Made for developers, for developers

[⬆ Back to Top](#-segmentai-pro)

</div>
