"""
Test script for the Customer Segmentation API.
Run this after starting the API server to verify functionality.
"""
import requests
import json

API_URL = "http://localhost:8000"

def test_health():
    """Test health check endpoint."""
    print("\n1. Testing Health Check...")
    response = requests.get(f"{API_URL}/health")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    return response.status_code == 200

def test_segments():
    """Test segments listing endpoint."""
    print("\n2. Testing Segments Listing...")
    response = requests.get(f"{API_URL}/segments")
    print(f"Status: {response.status_code}")
    data = response.json()
    print(f"Found {len(data)} segments")
    for segment in data:
        print(f"  - {segment['name']} (Cluster {segment['cluster_id']})")
    return response.status_code == 200

def test_prediction():
    """Test prediction endpoint."""
    print("\n3. Testing Prediction...")
    
    test_cases = [
        {"age": 25, "annual_income": 40.0, "spending_score": 80, "expected": "Young/High Spending"},
        {"age": 50, "annual_income": 120.0, "spending_score": 90, "expected": "High Value"},
        {"age": 35, "annual_income": 30.0, "spending_score": 20, "expected": "Budget Conscious"},
    ]
    
    for i, test_case in enumerate(test_cases, 1):
        print(f"\n  Test Case {i}:")
        print(f"  Input: Age={test_case['age']}, Income=${test_case['annual_income']}k, Score={test_case['spending_score']}")
        
        payload = {
            "age": test_case["age"],
            "annual_income": test_case["annual_income"],
            "spending_score": test_case["spending_score"]
        }
        
        response = requests.post(f"{API_URL}/predict", json=payload)
        
        if response.status_code == 200:
            result = response.json()
            print(f"  Predicted Segment: {result['segment_name']}")
            print(f"  Cluster ID: {result['cluster_id']}")
            print(f"  Strategy: {result['marketing_strategy']}")
        else:
            print(f"  Error: {response.status_code}")
            print(f"  {response.text}")
            return False
    
    return True

def main():
    """Run all tests."""
    print("="*60)
    print("Customer Segmentation API Test Suite")
    print("="*60)
    
    try:
        results = {
            "Health Check": test_health(),
            "Segments Listing": test_segments(),
            "Prediction": test_prediction()
        }
        
        print("\n" + "="*60)
        print("Test Results Summary")
        print("="*60)
        for test_name, passed in results.items():
            status = "✓ PASSED" if passed else "✗ FAILED"
            print(f"{test_name}: {status}")
        
        all_passed = all(results.values())
        print("\n" + ("="*60))
        if all_passed:
            print("All tests passed! ✓")
        else:
            print("Some tests failed. Check the API server.")
        print("="*60)
        
    except requests.exceptions.ConnectionError:
        print("\n✗ ERROR: Could not connect to API server.")
        print("Make sure the API is running at http://localhost:8000")
        print("Start it with: cd api && uvicorn main:app --reload")

if __name__ == "__main__":
    main()
