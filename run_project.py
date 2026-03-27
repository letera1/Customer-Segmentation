"""
Automated project setup and execution script.
This script helps you get started quickly.
"""
import subprocess
import sys
import os
from pathlib import Path

def print_header(text):
    """Print formatted header."""
    print("\n" + "="*60)
    print(f"  {text}")
    print("="*60 + "\n")

def check_python_packages():
    """Check if required Python packages are installed."""
    print_header("Checking Python Dependencies")
    
    required = ['pandas', 'numpy', 'scikit-learn', 'matplotlib', 'seaborn', 'fastapi', 'uvicorn', 'jupyter']
    missing = []
    
    for package in required:
        try:
            __import__(package)
            print(f"✓ {package}")
        except ImportError:
            print(f"✗ {package} (missing)")
            missing.append(package)
    
    if missing:
        print(f"\nMissing packages: {', '.join(missing)}")
        print("Install with: pip install -r requirements.txt")
        return False
    
    print("\n✓ All Python dependencies installed")
    return True

def check_node_modules():
    """Check if Node.js dependencies are installed."""
    print_header("Checking Frontend Dependencies")
    
    frontend_path = Path("frontend")
    node_modules = frontend_path / "node_modules"
    
    if node_modules.exists():
        print("✓ Node modules installed")
        return True
    else:
        print("✗ Node modules not found")
        print("Install with: cd frontend && npm install")
        return False

def run_notebook():
    """Open Jupyter notebook."""
    print_header("Opening Jupyter Notebook")
    print("Opening customer_segmentation.ipynb...")
    print("Execute all cells to train the model and generate outputs.")
    
    try:
        subprocess.run(["jupyter", "notebook", "notebooks/customer_segmentation.ipynb"])
    except FileNotFoundError:
        print("✗ Jupyter not found. Install with: pip install jupyter")

def start_api():
    """Start FastAPI server."""
    print_header("Starting API Server")
    print("Starting FastAPI at http://localhost:8000")
    print("Press Ctrl+C to stop")
    
    os.chdir("api")
    try:
        subprocess.run(["uvicorn", "main:app", "--reload"])
    except FileNotFoundError:
        print("✗ uvicorn not found. Install with: pip install uvicorn")
    except KeyboardInterrupt:
        print("\n✓ API server stopped")

def start_frontend():
    """Start Next.js frontend."""
    print_header("Starting Frontend")
    print("Starting Next.js at http://localhost:3000")
    print("Press Ctrl+C to stop")
    
    os.chdir("frontend")
    try:
        subprocess.run(["npm", "run", "dev"])
    except FileNotFoundError:
        print("✗ npm not found. Install Node.js first")
    except KeyboardInterrupt:
        print("\n✓ Frontend stopped")

def main():
    """Main menu."""
    print_header("Customer Segmentation Project")
    
    print("What would you like to do?\n")
    print("1. Check dependencies")
    print("2. Run Jupyter notebook (train model)")
    print("3. Start API server")
    print("4. Start frontend")
    print("5. Exit")
    
    choice = input("\nEnter choice (1-5): ").strip()
    
    if choice == "1":
        check_python_packages()
        check_node_modules()
    elif choice == "2":
        run_notebook()
    elif choice == "3":
        start_api()
    elif choice == "4":
        start_frontend()
    elif choice == "5":
        print("Goodbye!")
        sys.exit(0)
    else:
        print("Invalid choice")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nExiting...")
