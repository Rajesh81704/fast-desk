from fastapi import FastAPI, Request
from fastapi.responses import PlainTextResponse

app = FastAPI(title="FastDesk API")

# Change this to a secret value of your choice.
VERIFY_TOKEN = "fastdesk_webhook_secret"


# --------------------------------------------------
# Health check
# --------------------------------------------------

@app.get("/")
async def health():
    return {
        "status": "ok",
        "service": "FastDesk"
    }


# --------------------------------------------------
# Meta Webhook Verification
# --------------------------------------------------

@app.get("/webhook/whatsapp")
async def verify_webhook(request: Request):

    params = request.query_params

    mode = params.get("hub.mode")
    token = params.get("hub.verify_token")
    challenge = params.get("hub.challenge")

    if mode == "subscribe" and token == VERIFY_TOKEN:
        return PlainTextResponse(challenge)

    return PlainTextResponse(
        "Forbidden",
        status_code=403
    )


# --------------------------------------------------
# WhatsApp Incoming Webhook
# --------------------------------------------------

@app.post("/webhook/whatsapp")
async def whatsapp_webhook(request: Request):

    data = await request.json()

    print("========== WHATSAPP WEBHOOK ==========")
    print(data)
    print("======================================")

    return {
        "status": "received"
    }
