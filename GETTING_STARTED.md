# Getting Started Guide

Complete walkthrough for running the Customer Segmentation System.

## Prerequisites Check

Before starting, ensure you have:
- [ ] Python 3.8 or higher installed
- [ ] Node.js 18 or higher installed
- [ ] pip (Python package manager)
- [ ] npm (Node package manager)
- [ ] Jupyter Notebook
- [ ] Git (optional, for version control)

Check versions:
```bash
python --version
node --version
pip --version
npm --version
```

## Installation Steps

### 1. Clone or Download Project
```bash
# If using git
git clone <repository-url>
cd customer-segmentation

# Or download and extract ZIP file
```

### 2. Set Up Python Environment (Recommended)
```bash
# Create virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate
```

### 3. Install Python Dependencies
```bash
pip install -r requirements.txt
```

This installs:
- pandas, numpy (data processing)
- scikit-learn (machine learning)
- matplotlib, seaborn (visualization)
- jupyter (notebooks)
- fastapi, uvicorn (API server)
- joblib (model persistence)

### 4. Install Frontend Dependencies
```bash
cd frontend
npm install
cd ..
```

## Running the Project

### Phase 1: Train the Model

1. **Start Jupyter Notebook:**
```bash
jupyter notebook
```

2. **Open the notebook:**
   - Navigate to `notebooks/customer_segmentation.ipynb`
   - Click to open

3. **Execute all cells:**
   - Click "Cell" → "Run All"
   - Or press Shift+Enter on each cell

4. **What happens:**
   - Generates sample customer data (200 records)
   - Performs exploratory data analysis
   - Creates visualizations
   - Trains K-Means clustering model
   - Saves model to `data/outputs/segmentation_model.pkl`
   - Saves scaler to `data/outputs/scaler.pkl`
   - Generates cluster report

5. **Expected outputs in `data/outputs/`:**
   - `segmentation_model.pkl` (trained model)
   - `scaler.pkl` (feature scaler)
   - `cluster_report.json` (segment profiles)
   - `*.png` (visualization plots)

### Phase 2: Start the API Server

1. **Open a new terminal**

2. **Navigate to API directory:**
```bash
cd api
```

3. **Start the server:**
```bash
uvicorn main:app --reload
```

4. **Verify it's running:**
   - Open browser: `http://localhost:8000`
   - Check docs: `http://localhost:8000/docs`
   - You should see the API welcome message

5. **Test the API:**
```bash
# In another terminal
python test_api.py
```

### Phase 3: Launch the Frontend

1. **Open another new terminal**

2. **Navigate to frontend directory:**
```bash
cd frontend
```

3. **Start development server:**
```bash
npm run dev
```

4. **Open the dashboard:**
   - Browser: `http://localhost:3000`
   - You should see the Customer Segmentation Dashboard

## Using the Dashboard

### Input Customer Data
1. Use the sliders to adjust:
   - **Age**: 18-70 years
   - **Annual Income**: $15k-$140k
   - **Spending Score**: 1-100

2. Click "Predict Segment"

3. View the prediction:
   - Segment name (e.g., "High Value")
   - Description
   - Marketing strategy
   - Cluster ID

### View All Segments
Scroll down to see all 5 customer segments with:
- Segment names and icons
- Descriptions
- Marketing strategies

## Troubleshooting

### Issue: "Module not found" error
**Solution:** Install missing package
```bash
pip install <package-name>
```

### Issue: API returns 503 error
**Solution:** Model not trained yet
- Run the Jupyter notebook first
- Make sure `data/outputs/segmentation_model.pkl` exists

### Issue: Frontend can't connect to API
**Solution:** Check CORS and API status
- Ensure API is running on port 8000
- Check `http://localhost:8000/health`
- Verify CORS settings in `api/main.py`

### Issue: Port already in use
**Solution:** Use different port
```bash
# API on different port
uvicorn main:app --reload --port 8001

# Frontend on different port
npm run dev -- -p 3001
```

### Issue: Jupyter kernel crashes
**Solution:** Restart kernel
- Click "Kernel" → "Restart & Clear Output"
- Run cells again

## Next Steps

### Customize with Your Data
1. Replace sample data in notebook:
```python
# Instead of generating random data
df_raw = pd.read_csv('path/to/your/data.csv')
```

2. Ensure your CSV has columns:
   - Age (numeric)
   - Annual Income (numeric)
   - Spending Score (numeric)

3. Retrain the model by running all cells

### Deploy to Production
See [DEPLOYMENT.md](DEPLOYMENT.md) for:
- Docker deployment
- Cloud hosting (AWS, GCP, Vercel)
- Environment configuration
- Scaling strategies

### Extend Functionality
Ideas for enhancement:
- Add user authentication
- Store predictions in database
- Add more features (purchase history, demographics)
- Try different clustering algorithms
- Build admin dashboard for model retraining

## Project Workflow Summary

```
1. Train Model (Jupyter)
   ↓
2. Start API (FastAPI)
   ↓
3. Launch Frontend (Next.js)
   ↓
4. Use Dashboard
   ↓
5. Get Predictions
```

## Support

If you encounter issues:
1. Check this guide first
2. Review error messages carefully
3. Verify all dependencies are installed
4. Ensure all services are running
5. Check the logs for detailed errors

## Resources

- **FastAPI Docs**: https://fastapi.tiangolo.com
- **Next.js Docs**: https://nextjs.org/docs
- **scikit-learn**: https://scikit-learn.org
- **Tailwind CSS**: https://tailwindcss.com

---

Happy segmenting! 🎯
