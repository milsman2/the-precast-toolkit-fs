import logging
import os
import secrets
from dotenv import load_dotenv
from enum import Enum
from functools import lru_cache
from typing import Optional

from pydantic import BaseSettings, PostgresDsn

logger = logging.getLogger(__name__)

load_dotenv()

class EnvironmentEnum(str, Enum):
    PRODUCTION = "production"
    LOCAL = "local"

class GlobalConfig(BaseSettings):
    TITLE: str = "Full Stack Precast Concrete"
    DESCRIPTION: str = "A REST API for DevOps Focused Full Stack Precast Concrete"
    JWT_SECRET: str = secrets.token_urlsafe(32)
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
    ALGORITHM = "HS256"
    ENVIRONMENT: EnvironmentEnum
    DEBUG: bool = False
    TESTING: bool = False
    TIMEZONE: str = "CDT"

    DB_USER: str = os.environ["DB_USER"]
    DB_PWD: str =  os.environ["DB_PWD"]
    DB_HOST: str = os.environ["DB_HOST"]
    DB_NAME: str = os.environ["DB_NAME"]
    DATABASE_URL: Optional[PostgresDsn] = f"postgresql://{DB_USER}:{DB_PWD}@{DB_HOST}:5422/{DB_NAME}"
    DB_ECHO_LOG: bool = False

    @property
    def async_database_url(self) -> Optional[str]:
        return (
            self.DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://")
            if self.DATABASE_URL
            else self.DATABASE_URL
        )

    # Api V1 prefix
    API_V1_STR = "/api/v1"

    class Config:
        case_sensitive = True

class LocalConfig(GlobalConfig):
    """Local configurations."""

    DEBUG: bool = True
    ENVIRONMENT: EnvironmentEnum = EnvironmentEnum.LOCAL


class ProdConfig(GlobalConfig):
    """Production configurations."""

    DEBUG: bool = False
    ENVIRONMENT: EnvironmentEnum = EnvironmentEnum.PRODUCTION


class FactoryConfig:
    def __init__(self, environment: Optional[str]):
        self.environment = environment

    def __call__(self) -> GlobalConfig:
        if self.environment == EnvironmentEnum.LOCAL.value:
            return LocalConfig()
        return ProdConfig()


@lru_cache()
def get_configuration() -> GlobalConfig:
    return FactoryConfig(os.environ.get("ENVIRONMENT"))()


settings = get_configuration()