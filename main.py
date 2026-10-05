from typing import Optional, Dict, Any
from fastapi import FastAPI, Query, status
from fastapi.responses import PlainTextResponse
from pydantic import BaseModel, Field

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

Welcome to the FastDesk API documentation.

### Features
* **Health Check**: Service status monitoring.
* **Webhook Verification**: Meta / WhatsApp Cloud API `GET` challenge verification (`hub.challenge`).
* **Incoming Webhook**: `POST` handler for Meta WhatsApp events and incoming messages.

### Swagger & ReDoc Documentation
* Swagger Interactive UI: `/docs`
* ReDoc UI: `/redoc`
""",
    version="1.0.0",
    openapi_tags=tags_metadata,
    docs_url="/docs",
    redoc_url="/redoc",
)

# Change this to a secret value of your choice.
VERIFY_TOKEN = "fastdesk_webhook_secret"


class HealthResponse(BaseModel):
    status: str = Field(..., examples=["ok"])
    service: str = Field(..., examples=["FastDesk"])


class WebhookStatusResponse(BaseModel):
    status: str = Field(..., examples=["received"])


# --------------------------------------------------
# Health check
# --------------------------------------------------

@app.get(
    "/",
    tags=["Health"],
    summary="Health Check",
    description="Returns the operational status of the FastDesk API service.",
    response_model=HealthResponse,
)
async def health():
    return {
        "status": "ok",
        "service": "FastDesk"
    }


# --------------------------------------------------
# Meta Webhook Verification
# --------------------------------------------------

@app.get(
    "/webhook/whatsapp",
    tags=["WhatsApp Webhook"],
    summary="Verify Meta WhatsApp Webhook",
    description="Endpoint invoked by Meta to verify webhook endpoint ownership using `hub.mode`, `hub.verify_token`, and `hub.challenge`.",
    responses={
        200: {
            "description": "Returns the challenge string upon successful token verification.",
            "content": {"text/plain": {"example": "1158201444"}},
        },
        403: {
            "description": "Forbidden response when verification token does not match.",
            "content": {"text/plain": {"example": "Forbidden"}},
        },
    },
)
async def verify_webhook(
    mode: Optional[str] = Query(None, alias="hub.mode", description="Verification mode, should be 'subscribe'", examples=["subscribe"]),
    token: Optional[str] = Query(None, alias="hub.verify_token", description="Verification token configured in Meta App dashboard", examples=["fastdesk_webhook_secret"]),
    challenge: Optional[str] = Query(None, alias="hub.challenge", description="Challenge string sent by Meta to echo back", examples=["1158201444"]),
):
    if mode == "subscribe" and token == VERIFY_TOKEN and challenge:
        return PlainTextResponse(challenge)

    return PlainTextResponse(
        "Forbidden",
        status_code=status.HTTP_403_FORBIDDEN
    )


# --------------------------------------------------
# WhatsApp Incoming Webhook
# --------------------------------------------------

@app.post(
    "/webhook/whatsapp",
    tags=["WhatsApp Webhook"],
    summary="Receive WhatsApp Webhook Events",
    description="Receives real-time incoming messages, status updates, and notifications from Meta WhatsApp Cloud API.",
    response_model=WebhookStatusResponse,
)
async def whatsapp_webhook(payload: Dict[str, Any]):
    print("========== WHATSAPP WEBHOOK ==========")
    print(payload)
    print("======================================")

    return {
        "status": "received"
    }

