import os
from typing import Optional, Dict, Any
from fastapi import FastAPI, Query, Request, status, HTTPException
from fastapi.exceptions import RequestValidationError
from fastapi.responses import PlainTextResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

from fastdesk.config import settings
from fastdesk.services.whatsapp_webhook import process_and_log_webhook_payload

tags_metadata = [
    {
        "name": "Health",
        "description": "API health and status check operations.",
    },
    {
        "name": "WhatsApp Webhook",
        "description": "Endpoints for Meta WhatsApp Webhook verification and incoming message events.",
    },
]

app = FastAPI(
    title="FastDesk API",
    description="""
## FastDesk WhatsApp Webhook Service

Production-ready backend service integrating with Meta WhatsApp Cloud API.

### Endpoints
* **Health Check**: `GET /`
* **Webhook Verification**: `GET /webhook/whatsapp`
* **Incoming Events**: `POST /webhook/whatsapp`

### Documentation
* Swagger UI: `/docs`
* ReDoc UI: `/redoc`
""",
    version="1.0.0",
    openapi_tags=tags_metadata,
    docs_url="/docs",
    redoc_url="/redoc",
)

# Mount public folder for static assets
if os.path.exists("public"):
    app.mount("/public", StaticFiles(directory="public"), name="public")



# --------------------------------------------------
# Exception Handlers
# --------------------------------------------------

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """Clean validation error handling to avoid exposing stack traces."""
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={"detail": "Invalid request parameters or malformed JSON payload"},
    )


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Global error handler preventing credential or internal exception leaks."""
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "An internal server error occurred"},
    )


# --------------------------------------------------
# Pydantic Response Models
# --------------------------------------------------

class HealthResponse(BaseModel):
    status: str = Field(..., examples=["ok"])
    service: str = Field(..., examples=["FastDesk"])


class WebhookStatusResponse(BaseModel):
    status: str = Field(..., examples=["received"])


# --------------------------------------------------
# Health check
# --------------------------------------------------

@app.get(
    "/api/health",
    tags=["Health"],
    summary="Health Check",
    description="Returns the operational status of the FastDesk API service without exposing secrets.",
    response_model=HealthResponse,
)
async def health():
    return {
        "status": "ok",
        "service": "FastDesk",
    }


# --------------------------------------------------
# Meta Webhook Verification
# --------------------------------------------------

@app.get(
    "/webhook/whatsapp",
    tags=["WhatsApp Webhook"],
    summary="Verify Meta WhatsApp Webhook",
    description="Endpoint invoked by Meta to verify webhook ownership using `hub.mode`, `hub.verify_token`, and `hub.challenge`.",
    responses={
        200: {
            "description": "Returns challenge string upon successful token verification.",
            "content": {"text/plain": {"example": "123456"}},
        },
        403: {
            "description": "Forbidden response when verification token is invalid.",
            "content": {"text/plain": {"example": "Forbidden"}},
        },
    },
)
async def verify_webhook(
    mode: Optional[str] = Query(None, alias="hub.mode", description="Verification mode, should be 'subscribe'", examples=["subscribe"]),
    token: Optional[str] = Query(None, alias="hub.verify_token", description="Verification token configured in Meta App dashboard", examples=["fastdesk_webhook_secret"]),
    challenge: Optional[str] = Query(None, alias="hub.challenge", description="Challenge string sent by Meta to echo back", examples=["123456"]),
):
    if mode == "subscribe" and token and token == settings.WHATSAPP_VERIFY_TOKEN and challenge:
        return PlainTextResponse(content=challenge, status_code=status.HTTP_200_OK)

    return PlainTextResponse(
        content="Forbidden",
        status_code=status.HTTP_403_FORBIDDEN,
    )


# --------------------------------------------------
# WhatsApp Incoming Webhook
# --------------------------------------------------

@app.post(
    "/webhook/whatsapp",
    tags=["WhatsApp Webhook"],
    summary="Receive WhatsApp Webhook Events",
    description="Receives real-time incoming messages and status events from Meta WhatsApp Cloud API.",
    response_model=WebhookStatusResponse,
)
async def whatsapp_webhook(request: Request):
    try:
        data = await request.json()
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Malformed JSON body",
        )

    # Safely process and log non-sensitive information
    process_and_log_webhook_payload(data)

    return {
        "status": "received",
    }
