import pytest
from unittest.mock import AsyncMock, MagicMock, patch
from fastapi.testclient import TestClient
from app.main import app
from app.config import settings
from app.services.whatsapp import send_whatsapp_message

client = TestClient(app)


def test_health_check():
    """GET / should return 200 and health status without exposing secrets."""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data == {"status": "ok", "service": "FastDesk"}
    assert "WHATSAPP_ACCESS_TOKEN" not in data
    assert "WHATSAPP_VERIFY_TOKEN" not in data


def test_webhook_verification_success():
    """GET /webhook/whatsapp with correct verify_token should return challenge string with 200."""
    challenge_str = "test_challenge_123456"
    response = client.get(
        f"/webhook/whatsapp?hub.mode=subscribe&hub.verify_token={settings.WHATSAPP_VERIFY_TOKEN}&hub.challenge={challenge_str}"
    )
    assert response.status_code == 200
    assert response.text == challenge_str


def test_webhook_verification_invalid_token():
    """GET /webhook/whatsapp with wrong verify_token should return 403 Forbidden."""
    response = client.get(
        "/webhook/whatsapp?hub.mode=subscribe&hub.verify_token=invalid_secret&hub.challenge=123456"
    )
    assert response.status_code == 403
    assert response.text == "Forbidden"


def test_webhook_verification_invalid_mode():
    """GET /webhook/whatsapp with invalid mode should return 403 Forbidden."""
    response = client.get(
        f"/webhook/whatsapp?hub.mode=invalid_mode&hub.verify_token={settings.WHATSAPP_VERIFY_TOKEN}&hub.challenge=123456"
    )
    assert response.status_code == 403
    assert response.text == "Forbidden"


def test_incoming_webhook_valid_message_payload():
    """POST /webhook/whatsapp with a valid sample Meta WhatsApp message payload returns 200."""
    sample_payload = {
        "object": "whatsapp_business_account",
        "entry": [
            {
                "id": "123456789",
                "changes": [
                    {
                        "value": {
                            "messaging_product": "whatsapp",
                            "metadata": {
                                "display_phone_number": "15550555",
                                "phone_number_id": "987654321"
                            },
                            "contacts": [
                                {
                                    "profile": {"name": "Jane Doe"},
                                    "wa_id": "16505551234"
                                }
                            ],
                            "messages": [
                                {
                                    "from": "16505551234",
                                    "id": "wamid.HBgLMTY1MDU1NTEyMzIVAg...",
                                    "timestamp": "1603059220",
                                    "text": {"body": "Hello FastDesk!"},
                                    "type": "text"
                                }
                            ]
                        },
                        "field": "messages"
                    }
                ]
            }
        ]
    }
    response = client.post("/webhook/whatsapp", json=sample_payload)
    assert response.status_code == 200
    assert response.json() == {"status": "received"}


def test_incoming_webhook_status_update_payload():
    """POST /webhook/whatsapp with a status update payload returns 200."""
    sample_status_payload = {
        "object": "whatsapp_business_account",
        "entry": [
            {
                "id": "123456789",
                "changes": [
                    {
                        "value": {
                            "messaging_product": "whatsapp",
                            "metadata": {
                                "phone_number_id": "987654321"
                            },
                            "statuses": [
                                {
                                    "id": "wamid.HBgLMTY1MDU1NTEyMzIVAg...",
                                    "status": "delivered",
                                    "timestamp": "1603059221",
                                    "recipient_id": "16505551234"
                                }
                            ]
                        },
                        "field": "messages"
                    }
                ]
            }
        ]
    }
    response = client.post("/webhook/whatsapp", json=sample_status_payload)
    assert response.status_code == 200
    assert response.json() == {"status": "received"}


def test_incoming_webhook_invalid_json():
    """POST /webhook/whatsapp with malformed JSON body returns 400 Bad Request."""
    response = client.post(
        "/webhook/whatsapp",
        content="invalid json body",
        headers={"Content-Type": "application/json"}
    )
    assert response.status_code == 400
    assert response.json() == {"detail": "Malformed JSON body"}


@pytest.mark.asyncio
async def test_send_whatsapp_message_utility():
    """Test WhatsApp API sender utility with mocked HTTP client."""
    mock_response = MagicMock()
    mock_response.status_code = 200
    mock_response.json.return_value = {
        "messaging_product": "whatsapp",
        "contacts": [{"input": "16505551234", "wa_id": "16505551234"}],
        "messages": [{"id": "wamid.OUTBOUND_12345"}]
    }

    with patch("httpx.AsyncClient.post", new_callable=AsyncMock) as mock_post:
        mock_post.return_value = mock_response
        res = await send_whatsapp_message(
            phone_number_id="123456789",
            recipient_phone_number="16505551234",
            message_payload={"type": "text", "text": {"body": "Test Outbound Message"}},
            access_token="test_access_token_123"
        )
        assert res["messages"][0]["id"] == "wamid.OUTBOUND_12345"
        mock_post.assert_called_once()
