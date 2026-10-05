# FastDesk API

Production-ready FastAPI backend integrating directly with the Meta WhatsApp Cloud API.

---

## 🛠️ Required Environment Variables

Configure the following environment variables in your `.env` file (or Vercel Environment Variables dashboard):

| Variable Name | Description | Default / Example |
| :--- | :--- | :--- |
| `WHATSAPP_VERIFY_TOKEN` | Secret token created by FastDesk for Meta Webhook verification. | `fastdesk_webhook_secret` |
| `WHATSAPP_ACCESS_TOKEN` | Meta WhatsApp Cloud API access token (System User Permanent Token). | *Keep secret & uncommitted* |
| `META_GRAPH_API_VERSION` | Version of Meta Graph API used for message delivery. | `v21.0` |

> ⚠️ **SECURITY NOTICE**: Never commit your `.env` file or hardcode your `WHATSAPP_ACCESS_TOKEN`. Ensure `.env` is listed in `.gitignore`.

---

## 🚀 Running the FastAPI Server Locally

1. **Clone & Setup Virtual Environment**:
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   ```

2. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and set your credentials.

3. **Start Development Server**:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

4. **Access Swagger UI & Documentation**:
   - Interactive Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)
   - ReDoc UI: [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## 🧪 Running Unit Tests

Run the full pytest suite:

```bash
pytest -v
```

---

## 📡 Webhook Endpoints & Behavior

### 1. Health Check
- **Endpoint**: `GET /`
- **Response**:
  ```json
  {
    "status": "ok",
    "service": "FastDesk"
  }
  ```

### 2. Meta Webhook Verification
- **Endpoint**: `GET /webhook/whatsapp`
- **How Verification Works**:
  When configuring your webhook in Meta App Dashboard, Meta sends a `GET` request with query parameters:
  - `hub.mode=subscribe`
  - `hub.verify_token=<YOUR_WHATSAPP_VERIFY_TOKEN>`
  - `hub.challenge=<RANDOM_STRING>`
  
  If `hub.verify_token` matches your `WHATSAPP_VERIFY_TOKEN`, FastDesk responds with the plain text `hub.challenge` string and HTTP 200 OK. Otherwise, it returns HTTP 403 Forbidden.

- **Example Curl Test**:
  ```bash
  curl -i "http://localhost:8000/webhook/whatsapp?hub.mode=subscribe&hub.verify_token=fastdesk_webhook_secret&hub.challenge=123456"
  ```
  **Expected Output**:
  ```http
  HTTP/1.1 200 OK
  content-type: text/plain; charset=utf-8

  123456
  ```

### 3. Incoming WhatsApp Webhook Events
- **Endpoint**: `POST /webhook/whatsapp`
- **Payload**: Accepts Meta WhatsApp JSON event notifications.
- **Behavior**: Parses messages and status events, logs safe non-sensitive metadata (Message ID, Sender ID, Recipient Phone Number ID, Message Type, Timestamp), and returns HTTP 200:
  ```json
  {
    "status": "received"
  }
  ```

- **Example Curl Test**:
  ```bash
  curl -i -X POST "http://localhost:8000/webhook/whatsapp" \
    -H "Content-Type: application/json" \
    -d '{
      "object": "whatsapp_business_account",
      "entry": [{
        "id": "123456",
        "changes": [{
          "value": {
            "messaging_product": "whatsapp",
            "metadata": { "phone_number_id": "987654321" },
            "messages": [{
              "from": "16505551234",
              "id": "wamid.HBgLMTY1MDU1...",
              "timestamp": "1603059220",
              "text": { "body": "Hello FastDesk!" },
              "type": "text"
            }]
          },
          "field": "messages"
        }]
      }]
    }'
  ```

---

## ⚙️ Meta WhatsApp Webhook Configuration Guide

To connect FastDesk to your Meta Developer Account:

1. Go to [Meta for Developers Dashboard](https://developers.facebook.com/).
2. Select your App -> **WhatsApp** -> **Configuration**.
3. Under **Edit Webhook**:
   - **Callback URL**: `https://YOUR_DOMAIN/webhook/whatsapp` (e.g. `https://fast-desk-sigma.vercel.app/webhook/whatsapp`)
   - **Verify Token**: Set to the value of your `WHATSAPP_VERIFY_TOKEN` (e.g. `fastdesk_webhook_secret`).
4. Click **Verify and Save**.
5. Under **Webhook Fields**, subscribe to `messages`.
