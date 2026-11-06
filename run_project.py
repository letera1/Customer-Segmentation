"""
Automated project setup and execution script.
This script helps you get started quickly.
"""
import subprocess
import sys
import os
from pathlib import Path

# Ensure UTF-8 output on Windows consoles
if sys.platform == "win32" and hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")


def print_header(text: str):
    """Print formatted header."""
    print("\n" + "=" * 60)
    print(f"  {text}")
    print("=" * 60 + "\n")


def check_python_packages():
    """Check if required Python packages are installed."""
    print_header("Checking Python Dependencies")
    
    # Mapping of package names to their importable module names
    required = {
        'pandas': 'pandas',
        'numpy': 'numpy',
        'scikit-learn': 'sklearn',
        'matplotlib': 'matplotlib',
        'seaborn': 'seaborn',
        'fastapi': 'fastapi',
        'uvicorn': 'uvicorn',
        'jupyter': 'jupyter'
    }
    missing = []
    
    for display_name, mod_name in required.items():
        try:
            __import__(mod_name)
            print(f"[+] {display_name}")
        except ImportError:
            print(f"[-] {display_name} (missing)")
            missing.append(display_name)
    
    if missing:
        print(f"\nMissing packages: {', '.join(missing)}")
        print("Install with: pip install -r requirements.txt")
        return False
    
    print("\n[+] All Python dependencies installed")
    return True


def check_node_modules():
    """Check if Node.js dependencies are installed."""
    print_header("Checking Frontend Dependencies")
    
    frontend_path = Path("frontend")
    node_modules = frontend_path / "node_modules"
    
    if node_modules.exists():
        print("[+] Node modules installed")
        return True
    else:
        print("[-] Node modules not found")
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
        print("[-] Jupyter not found. Install with: pip install jupyter")


def start_api():
    """Start FastAPI server."""
    print_header("Starting API Server")
    print("Starting FastAPI at http://localhost:8000")
    print("Press Ctrl+C to stop")
    
    try:
        subprocess.run(["uvicorn", "api.main:app", "--reload"])
    except FileNotFoundError:
        print("[-] uvicorn not found. Install with: pip install uvicorn")
    except KeyboardInterrupt:
        print("\n[+] API server stopped")


def start_frontend():
    """Start Next.js frontend."""
    print_header("Starting Frontend")
    print("Starting Next.js at http://localhost:3000")
    print("Press Ctrl+C to stop")
    
    root_dir = os.getcwd()
    frontend_dir = os.path.join(root_dir, "frontend")
    os.chdir(frontend_dir)
    try:
        subprocess.run(["npm", "run", "dev"], shell=True)
    except FileNotFoundError:
        print("[-] npm not found. Install Node.js first")
    except KeyboardInterrupt:
        print("\n[+] Frontend stopped")
    finally:
        os.chdir(root_dir)


def main():
    """Main menu."""
    print_header("Customer Segmentation Project")
    
    print("What would you like to do?\n")
    print("1. Check dependencies")
    print("2. Train model (train_model.py)")
    print("3. Run Jupyter notebook")
    print("4. Start API server")
    print("5. Start frontend")
    print("6. Exit")
    
    try:
        choice = input("\nEnter choice (1-6): ").strip()
    except (EOFError, KeyboardInterrupt):
        print("\nExiting...")
        return
    
    if choice == "1":
        check_python_packages()
        check_node_modules()
    elif choice == "2":
        subprocess.run([sys.executable, "train_model.py"])
    elif choice == "3":
        run_notebook()
    elif choice == "4":
        start_api()
    elif choice == "5":
        start_frontend()
    elif choice == "6":
        print("Goodbye!")
        sys.exit(0)
    else:
        print("Invalid choice")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nExiting...")
