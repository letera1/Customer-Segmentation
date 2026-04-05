"""Backward-compatible API entrypoint.

This module intentionally re-exports the production API app from main_v2
so existing commands like `uvicorn api.main:app` keep working.
"""

from .main_v2 import app
