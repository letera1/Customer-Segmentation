"""Convenience entrypoint for running the API with `uvicorn main:app`."""

from __future__ import annotations

from api.main import app

__all__ = ["app"]
