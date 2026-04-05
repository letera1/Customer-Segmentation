"""Backward-compatible API entrypoint.

This module intentionally re-exports the production API app from main_v2
so existing commands like `uvicorn api.main:app` keep working.
"""

try:
	# Package import path (recommended): uvicorn api.main:app
	from .main_v2 import app
except ImportError:
	# Direct module path from api folder: uvicorn main:app
	import sys
	from pathlib import Path

	sys.path.append(str(Path(__file__).resolve().parent.parent))
	from api.main_v2 import app
