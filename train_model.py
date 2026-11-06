"""
Standalone script to train the customer segmentation model.
Run this before starting the API server.
"""
import sys
import os
import pandas as pd
import numpy as np
from pathlib import Path
import joblib

# Ensure UTF-8 output on Windows consoles
if sys.platform == "win32" and hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

# Add project root to path
sys.path.append('.')

from src.data_processing import DataProcessor
from src.modeling import CustomerSegmentation
from src.utils import save_cluster_report


def generate_segmented_dataset(n_samples: int = 250, seed: int = 42) -> pd.DataFrame:
    """Generate realistic clustered customer data corresponding to 5 segments."""
    np.random.seed(seed)
    n_per_cluster = n_samples // 5

    # 0: Budget Conscious (low income, low spending)
    c0_age = np.random.randint(30, 68, n_per_cluster)
    c0_income = np.random.randint(15, 45, n_per_cluster)
    c0_spending = np.random.randint(5, 40, n_per_cluster)

    # 1: High Value (high income, high spending)
    c1_age = np.random.randint(25, 52, n_per_cluster)
    c1_income = np.random.randint(75, 138, n_per_cluster)
    c1_spending = np.random.randint(68, 99, n_per_cluster)

    # 2: Potential Growth (high income, low spending)
    c2_age = np.random.randint(28, 62, n_per_cluster)
    c2_income = np.random.randint(75, 138, n_per_cluster)
    c2_spending = np.random.randint(10, 42, n_per_cluster)

    # 3: Average Customers (moderate income, moderate spending)
    c3_age = np.random.randint(22, 60, n_per_cluster)
    c3_income = np.random.randint(42, 72, n_per_cluster)
    c3_spending = np.random.randint(40, 62, n_per_cluster)

    # 4: Young Savers (young age, low-moderate income, moderate spending)
    c4_age = np.random.randint(18, 30, n_per_cluster)
    c4_income = np.random.randint(20, 55, n_per_cluster)
    c4_spending = np.random.randint(45, 78, n_per_cluster)

    age = np.concatenate([c0_age, c1_age, c2_age, c3_age, c4_age])
    income = np.concatenate([c0_income, c1_income, c2_income, c3_income, c4_income])
    spending = np.concatenate([c0_spending, c1_spending, c2_spending, c3_spending, c4_spending])
    genders = np.random.choice(['Male', 'Female'], len(age))

    df = pd.DataFrame({
        'CustomerID': range(1, len(age) + 1),
        'Gender': genders,
        'Age': age,
        'Annual Income (k$)': income,
        'Spending Score (1-100)': spending
    })
    return df


def main():
    print("=" * 60)
    print("Customer Segmentation Model Training")
    print("=" * 60)

    # Create directories
    Path("data/raw").mkdir(parents=True, exist_ok=True)
    Path("data/processed").mkdir(parents=True, exist_ok=True)
    Path("data/outputs").mkdir(parents=True, exist_ok=True)

    # Step 1: Generate sample data
    print("\n1. Generating customer dataset with 5 target clusters...")
    df_raw = generate_segmented_dataset(n_samples=250, seed=42)
    df_raw.to_csv('data/raw/mall_customers.csv', index=False)
    print(f"   [+] Created dataset with {len(df_raw)} customers")

    # Step 2: Clean data
    print("\n2. Cleaning data...")
    processor = DataProcessor()
    df_clean = processor.clean_data(df_raw)
    print(f"   [+] Data cleaned: {len(df_clean)} records")

    # Step 3: Prepare features
    print("\n3. Preparing and scaling features...")
    feature_cols = ['Age', 'Annual Income (k$)', 'Spending Score (1-100)']
    df_processed, X_scaled = processor.prepare_features(df_clean, feature_cols)
    print(f"   [+] Features scaled: {X_scaled.shape}")

    # Step 4: Find optimal clusters / elbow
    print("\n4. Evaluating clusters (Elbow Method)...")
    segmentation_model = CustomerSegmentation(random_state=42)
    optimal_k, inertias = segmentation_model.find_optimal_clusters(X_scaled, k_range=range(2, 11))
    print(f"   [+] Optimal curvature k: {optimal_k}")

    # Step 5: Fit 5 clusters to align with 5 business personas
    n_clusters = 5
    print(f"\n5. Fitting K-Means model with {n_clusters} clusters...")
    segmentation_model.fit(X_scaled, n_clusters=n_clusters)
    df_processed['Cluster'] = segmentation_model.predict(X_scaled)
    print("   [+] Model trained successfully")

    # Step 6: Save model and scaler
    print("\n6. Saving model artifacts...")
    segmentation_model.save_model('data/outputs/segmentation_model.pkl')
    print("   [+] Model saved to data/outputs/segmentation_model.pkl")

    joblib.dump(processor.scaler, 'data/outputs/scaler.pkl')
    print("   [+] Scaler saved to data/outputs/scaler.pkl")

    # Step 7: Save processed data
    df_processed.to_csv('data/processed/customers_with_clusters.csv', index=False)
    print("   [+] Processed data saved to data/processed/customers_with_clusters.csv")

    # Step 8: Generate cluster report
    print("\n7. Generating cluster report...")
    save_cluster_report(df_processed, 'Cluster', 'data/outputs/cluster_report.json')
    print("   [+] Cluster report saved to data/outputs/cluster_report.json")

    # Step 9: Display cluster summary
    print("\n" + "=" * 60)
    print("CLUSTER SUMMARY")
    print("=" * 60)
    for cluster_id in sorted(df_processed['Cluster'].unique()):
        cluster_data = df_processed[df_processed['Cluster'] == cluster_id]
        print(f"\nCluster {cluster_id}:")
        print(f"  Size: {len(cluster_data)} customers ({len(cluster_data)/len(df_processed)*100:.1f}%)")
        print(f"  Avg Age: {cluster_data['Age'].mean():.1f} years")
        print(f"  Avg Income: ${cluster_data['Annual Income (k$)'].mean():.1f}k")
        print(f"  Avg Spending: {cluster_data['Spending Score (1-100)'].mean():.1f}/100")

    print("\n" + "=" * 60)
    print("[+] TRAINING COMPLETE!")
    print("=" * 60)


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"\n[-] Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
