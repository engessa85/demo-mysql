

from connection.models import ChatMessage
import requests
import json

def stream_chat_generator(endpoint_url, payload, session, user):
    headers = {"Content-Type": "application/json"}

    with requests.post(endpoint_url, json=payload, headers=headers, stream=True) as response:
        response.raise_for_status()
        full_response = ""

        for line in response.iter_lines():
            if line:
                decoded_line = line.decode("utf-8").strip()
                if decoded_line.startswith("data:"):
                    decoded_line = decoded_line[len("data:"):].strip()

                try:
                    data = json.loads(decoded_line)
                    chunk = data.get("data", "")

                    if data.get("data_type") == "text":
                        full_response += chunk
                    
                    print(data)

                    yield f"data: {json.dumps(data)}\n\n"

                except json.JSONDecodeError:
                    yield f"data: {{'state': 'error', 'data': 'Malformed'}}\n\n"

        # Save assistant message
        if full_response:
            ChatMessage.objects.create(
                session=session,
                user=user,  # Use explicitly passed user
                role="assistant",
                content=full_response
            )
