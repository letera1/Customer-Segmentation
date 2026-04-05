"""
Configuration management for the API.
"""
from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache
from pathlib import Path


class Settings(BaseSettings):
    """Application settings with environment variable support."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        protected_namespaces=("settings_",),
    )
    
    # API Settings
    app_name: str = "SegmentAI Pro API"
    app_version: str = "2.0.0"
    debug: bool = False
    
    # Server Settings
    host: str = "0.0.0.0"
    port: int = 8000
    
    # CORS Settings
    cors_origins: list[str] = ["http://localhost:3000", "http://localhost:3001"]
    cors_methods: list[str] = ["GET", "POST", "OPTIONS"]
    cors_headers: list[str] = ["Authorization", "Content-Type", "X-Requested-With"]

    # Host and request constraints
    trusted_hosts: list[str] = ["localhost", "127.0.0.1", "*.localhost"]
    max_request_size_mb: int = 2
    
    # Model Settings
    model_path: Path = Path(__file__).parent.parent / "data" / "outputs" / "segmentation_model.pkl"
    scaler_path: Path = Path(__file__).parent.parent / "data" / "outputs" / "scaler.pkl"
    
    # Security
    api_key_enabled: bool = False
    api_key: str = ""
    rate_limit_enabled: bool = True
    max_requests_per_minute: int = 60
    
    # Logging
    log_level: str = "INFO"
    log_file: str = "logs/api.log"
    
@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance."""
    return Settings()
