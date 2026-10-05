"""
FastDesk Configuration Module
"""
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    WHATSAPP_VERIFY_TOKEN: str = "fastdesk_webhook_secret"
    WHATSAPP_ACCESS_TOKEN: str = ""
    META_GRAPH_API_VERSION: str = "v21.0"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )


settings = Settings()
