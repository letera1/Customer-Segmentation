"""
Standalone script to train the customer segmentation model.
Run this before starting the API server.
"""
import sys
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from pathlib import Path

# Add src to path
sys.path.append('.')

from src.data_processing import DataProcessor
from src.modeling import CustomerSegmentation
from src.utils import setup_plot_style, save_cluster_report

def main():
    print("="*60)
    print("Customer Segmentation Model Training")
    print("="*60)
    
    # Create directories
    Path("data/raw").mkdir(parents=True, exist_ok=True)
    Path("data/processed").mkdir(parents=True, exist_ok=True)
    Path("data/outputs").mkdir(parents=True, exist_ok=True)
    
    # Step 1: Generate sample data
    print("\n1. Generating sample customer data...")
    np.random.seed(42)
    n_samples = 200
    
    data = {
        'CustomerID': range(1, n_samples + 1),
        'Gender': np.random.choice(['Male', 'Female'], n_samples),
        'Age': np.random.randint(18, 70, n_samples),
        'Annual Income (k$)': np.random.randint(15, 140, n_samples),
        'Spending Score (1-100)': np.random.randint(1, 100, n_samples)
    }
    
    df_raw = pd.DataFrame(data)
    df_raw.to_csv('data/raw/mall_customers.csv', index=False)
    print(f"   ✓ Created dataset with {len(df_raw)} customers")
    
    # Step 2: Clean data
    print("\n2. Cleaning data...")
    processor = DataProcessor()
    df_clean = processor.clean_data(df_raw)
    print(f"   ✓ Data cleaned: {len(df_clean)} records")
    
    # Step 3: Prepare features
    print("\n3. Preparing features...")
    feature_cols = ['Age', 'Annual Income (k$)', 'Spending Score (1-100)']
    df_processed, X_scaled = processor.prepare_features(df_clean, feature_cols)
    print(f"   ✓ Features scaled: {X_scaled.shape}")
    
    # Step 4: Find optimal clusters
    print("\n4. Finding optimal number of clusters...")
    segmentation_model = CustomerSegmentation(random_state=42)
    optimal_k, inertias = segmentation_model.find_optimal_clusters(X_scaled, k_range=range(2, 11))
    print(f"   ✓ Optimal k: {optimal_k}")
    
    # Step 5: Train model
    print("\n5. Training K-Means model...")
    segmentation_model.fit(X_scaled)
    df_processed['Cluster'] = segmentation_model.predict(X_scaled)
    print(f"   ✓ Model trained successfully")
    
    # Step 6: Save model and scaler
    print("\n6. Saving model artifacts...")
    segmentation_model.save_model('data/outputs/segmentation_model.pkl')
    print("   ✓ Model saved to data/outputs/segmentation_model.pkl")
    
    import joblib
    joblib.dump(processor.scaler, 'data/outputs/scaler.pkl')
    print("   ✓ Scaler saved to data/outputs/scaler.pkl")
    
    # Step 7: Save processed data
    df_processed.to_csv('data/processed/customers_with_clusters.csv', index=False)
    print("   ✓ Processed data saved")
    
    # Step 8: Generate cluster report
    print("\n7. Generating cluster report...")
    report = save_cluster_report(df_processed, 'Cluster', 'data/outputs/cluster_report.json')
    print("   ✓ Cluster report saved")
    
    # Step 9: Display cluster summary
    print("\n" + "="*60)
    print("CLUSTER SUMMARY")
    print("="*60)
    for cluster_id in sorted(df_processed['Cluster'].unique()):
        cluster_data = df_processed[df_processed['Cluster'] == cluster_id]
        print(f"\nCluster {cluster_id}:")
        print(f"  Size: {len(cluster_data)} customers ({len(cluster_data)/len(df_processed)*100:.1f}%)")
        print(f"  Avg Age: {cluster_data['Age'].mean():.1f} years")
        print(f"  Avg Income: ${cluster_data['Annual Income (k$)'].mean():.1f}k")
        print(f"  Avg Spending: {cluster_data['Spending Score (1-100)'].mean():.1f}/100")
    
    print("\n" + "="*60)
    print("✓ TRAINING COMPLETE!")
    print("="*60)
    print("\nNext steps:")
    print("1. Start API: cd api && uvicorn main:app --reload")
    print("2. Start Frontend: cd frontend && npm run dev")
    print("3. Open dashboard: http://localhost:3000")
    print("\n")

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"\n✗ Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
