import logging
from typing import Dict, Any, Optional
import httpx
from app.config import settings

logger = logging.getLogger("fastdesk.whatsapp")


async def send_whatsapp_message(
    phone_number_id: str,
    recipient_phone_number: str,
    message_payload: Dict[str, Any],
    access_token: Optional[str] = None,
    graph_api_version: Optional[str] = None,
) -> Dict[str, Any]:
    """
    Reusable utility for sending WhatsApp messages via Meta Graph API.

    Args:
        phone_number_id: Meta WhatsApp Phone Number ID.
        recipient_phone_number: Recipient's phone number with country code (e.g., '15551234567').
        message_payload: Message payload dictionary (e.g. text body or template dictionary).
        access_token: Optional override for Meta Access Token. Defaults to settings.WHATSAPP_ACCESS_TOKEN.
        graph_api_version: Optional override for Graph API version. Defaults to settings.META_GRAPH_API_VERSION.

    Returns:
        Dict[str, Any]: JSON response from Meta Graph API.
    """
    token = access_token or settings.WHATSAPP_ACCESS_TOKEN
    version = graph_api_version or settings.META_GRAPH_API_VERSION

    if not token:
        logger.error("WhatsApp access token is not configured.")
        raise ValueError("WhatsApp access token is not configured")

    url = f"https://graph.facebook.com/{version}/{phone_number_id}/messages"

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }

    # Format payload into standard WhatsApp Cloud API structure if needed
    if "messaging_product" not in message_payload:
        payload = {
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": recipient_phone_number,
            "type": message_payload.get("type", "text"),
            **message_payload,
        }
    else:
        payload = message_payload

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(url, headers=headers, json=payload, timeout=10.0)

        if response.status_code >= 400:
            # Mask access token if present in error message before logging
            raw_error = response.text
            if token and token in raw_error:
                raw_error = raw_error.replace(token, "[REDACTED_ACCESS_TOKEN]")
            logger.error("Meta Graph API error (%d): %s", response.status_code, raw_error)
            raise httpx.HTTPStatusError(
                f"Meta API error with status code {response.status_code}",
                request=response.request,
                response=response,
            )

        return response.json()
    except Exception as exc:
        err_msg = str(exc)
        if token and token in err_msg:
            err_msg = err_msg.replace(token, "[REDACTED_ACCESS_TOKEN]")
        logger.error("Failed to send WhatsApp message: %s", err_msg)
        raise RuntimeError(f"WhatsApp API request failed: {err_msg}") from None
