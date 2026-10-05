import logging
from typing import Dict, Any, List

logger = logging.getLogger("fastdesk.webhook")


def process_and_log_webhook_payload(payload: Dict[str, Any]) -> List[Dict[str, Any]]:
    """
    Safely parses Meta WhatsApp incoming webhook payloads and logs non-sensitive event details.
    
    Extracts:
      - recipient phone_number_id
      - sender WhatsApp ID
      - message ID
      - message type
      - timestamp
      - status updates / delivery events
    
    Never logs auth tokens, credentials, or sensitive headers.
    """
    extracted_events = []

    if not isinstance(payload, dict):
        logger.warning("Received non-dictionary webhook payload.")
        return extracted_events

    obj_type = payload.get("object")
    if obj_type != "whatsapp_business_account":
        logger.info("Received non-WhatsApp webhook event object: %s", obj_type)
        return extracted_events

    entries = payload.get("entry", [])
    if not isinstance(entries, list):
        return extracted_events

    for entry in entries:
        changes = entry.get("changes", [])
        if not isinstance(changes, list):
            continue

        for change in changes:
            value = change.get("value", {})
            if not isinstance(value, dict):
                continue

            metadata = value.get("metadata", {})
            phone_number_id = metadata.get("phone_number_id")

            # Handle incoming messages
            messages = value.get("messages", [])
            if isinstance(messages, list) and messages:
                for msg in messages:
                    message_id = msg.get("id")
                    sender_wa_id = msg.get("from")
                    message_type = msg.get("type")
                    timestamp = msg.get("timestamp")

                    event_info = {
                        "event_type": "message",
                        "phone_number_id": phone_number_id,
                        "sender_wa_id": sender_wa_id,
                        "message_id": message_id,
                        "message_type": message_type,
                        "timestamp": timestamp,
                    }
                    extracted_events.append(event_info)

                    logger.info(
                        "[WhatsApp Webhook Message] PhoneID: %s | From: %s | MessageID: %s | Type: %s | Timestamp: %s",
                        phone_number_id,
                        sender_wa_id,
                        message_id,
                        message_type,
                        timestamp,
                    )

            # Handle status updates (delivered, read, sent, failed)
            statuses = value.get("statuses", [])
            if isinstance(statuses, list) and statuses:
                for status_obj in statuses:
                    status_id = status_obj.get("id")
                    status_state = status_obj.get("status")
                    recipient_id = status_obj.get("recipient_id")
                    timestamp = status_obj.get("timestamp")

                    status_info = {
                        "event_type": "status",
                        "phone_number_id": phone_number_id,
                        "recipient_id": recipient_id,
                        "status_id": status_id,
                        "status_state": status_state,
                        "timestamp": timestamp,
                    }
                    extracted_events.append(status_info)

                    logger.info(
                        "[WhatsApp Webhook Status] PhoneID: %s | To: %s | StatusID: %s | Status: %s | Timestamp: %s",
                        phone_number_id,
                        recipient_id,
                        status_id,
                        status_state,
                        timestamp,
                    )

    if not extracted_events:
        logger.info("Processed Meta webhook payload with no active messages or status updates.")

    return extracted_events
