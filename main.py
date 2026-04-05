"""Convenience entrypoint for running the API with `uvicorn main:app`.

The actual FastAPI app lives in `api/main_v2.py` (preferred) or `api/main.py`.
"""

from __future__ import annotations

try:
    # Preferred: services-based API with numeric confidence
    from api.main_v2 import app  # type: ignore
except Exception:  # pragma: no cover
    # Fallback: simpler API
    from api.main import app  # type: ignore
