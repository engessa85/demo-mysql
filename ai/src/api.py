import json
from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import StreamingResponse
from src.agents.agents_functions import master_agent
from src.utils.logs import logger

router = APIRouter()



@router.post('/stream_chat')
async def chat_stream(payload: dict):
    try:
        # Log essential information
        if 'messages' in payload and payload['messages']:
            last_message = payload['messages'][-1].get('content', '')
            logger.info(f"Responding to: {last_message}...")
        else:
            logger.info("Empty messages payload received")

        # Get streaming response generator
        response_generator = master_agent(payload['messages'])

        # Create an optimized event stream
        def event_stream():
            try:
                for resp in response_generator:
                    if resp:
                        yield json.dumps(resp) + "\n"
            except Exception as e:
                error_msg = json.dumps({"state": "Error" , "data": '', "data_type": "error", "responding_model": "api_function", "status": "error" , "reason":str(e)}) + "\n"
                yield f'{error_msg}'
                logger.error(f"Stream error: {e}")
        # Return streaming response with appropriate headers
        return StreamingResponse(
            event_stream(),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "Transfer-Encoding": "chunked"
            }
        )
    except KeyError as e:
        logger.error(f"No messages found in Payload: {e}")
        raise HTTPException(status_code=400, detail=f"Missing messages field: {e}")
    except Exception as e:
        logger.error(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Server Error")
