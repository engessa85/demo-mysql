import requests
import json


def test_stream_chat(endpoint_url, message_history):
    headers = {
        "Content-Type": "application/json"
    }

    messages_payload = {
        "messages": message_history
    }

    assistant_response = ""

    with requests.post(endpoint_url, json=messages_payload, headers=headers, stream=True) as response:
        response.raise_for_status()
        print("Assistant:", end=" ", flush=True)
        for line in response.iter_lines():
            if line:
                decoded_line = line.decode("utf-8")
                try:
                    data = json.loads(decoded_line)
                    # print(data)
                    chunk = data.get("data", "")
                    print(chunk, end='', flush=True)
                    assistant_response += str(chunk)
                except json.JSONDecodeError:
                    print(f"\nReceived malformed JSON chunk: {decoded_line}")

    print()  # newline after stream
    return assistant_response


if __name__ == "__main__":
    endpoint = "http://localhost:9000/api/bi_v1/stream_chat"
    message_history = []

    while True:
        user_input = input("\nYou: ")
        if user_input.lower() in {"exit", "quit"}:
            break

        # Add user message
        message_history.append({"role": "user", "content": user_input})

        # Get assistant streamed response
        assistant_message = test_stream_chat(endpoint, message_history)

        # Add assistant message to history
        message_history.append({"role": "assistant", "content": assistant_message})
