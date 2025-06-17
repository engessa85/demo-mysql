from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import DBConnectionHandlerSerializers
from .models import UserDatabase
from django.http import StreamingHttpResponse
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.shortcuts import get_object_or_404

from .utils import conneting_with_db, calling_open_ai_model, prompting
from AI.stream_chat import stream_chat_generator
import uuid
from .models import ChatSession, ChatMessage



class DBConnection(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "connetion with the db ...."})


class DBConnectionHandler(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        userDB = UserDatabase.objects.filter(user=user)
        serializer = DBConnectionHandlerSerializers(userDB, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        dBdata = request.data
        if dBdata["db_type"] == "mysql":
            try:
                db = conneting_with_db(dBdata["db_username"], dBdata["db_password"], dBdata["db_hostname"], dBdata["db_name"])
                table_info = db.get_table_info()
                data = request.data
                data["db_schema"] = table_info
                serializer = DBConnectionHandlerSerializers(data=data, context={"request": request})
                if serializer.is_valid():
                    serializer.save()
                    return Response({"message": "connection with the db done", "status":status.HTTP_200_OK}, status=status.HTTP_200_OK)
            except:
                return Response({"message": "connection with the db failed", "status":status.HTTP_400_BAD_REQUEST}, status=status.HTTP_400_BAD_REQUEST)
            
            
            
            
class DBChatingHandler(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, id):
        user = request.user
        question = request.data["question"]

        userDB = UserDatabase.objects.filter(user=user, id=id)[0]

    
        if not userDB:
             return Response({"message": "User database not found"}, status=status.HTTP_404_NOT_FOUND)

        if userDB.db_type == "mysql":

            try:
                db = conneting_with_db(userDB.db_username, userDB.db_password, userDB.db_hostname, userDB.db_name)
                table_info = db.get_table_info()
            except:
                return Response({"message": "connection with the db failed"}, status=status.HTTP_400_BAD_REQUEST)

        
            prompt = prompting()

            try:
                llm = calling_open_ai_model(model_name="gpt-4o-mini")
            except:
                return Response({"message": "connection with the llm failed"}, status=status.HTTP_400_BAD)

            sql_chain = prompt | llm

            query_response = sql_chain.invoke({"question": question, "table_info": table_info})

            try:
                db_response = db.run(query_response.content)
            except:
                return Response({"message": "sql query with the db failed"}, status=status.HTTP_400_BAD_REQUEST)
            
            return Response({"response": db_response}, status=status.HTTP_200_OK)







class TestChat(APIView):
    permission_classes = [IsAuthenticated]  # Requires logged-in users

    def post(self, request):
        message = request.data.get("message")
        session_id = request.data.get("session_id")
        print("message {} and session is {}".format(message, session_id))

        if not message:
            return Response({"error": "Message content is required."}, status=400)
        

        try:
            # Validate the format of the UUID
            uuid_obj = uuid.UUID(session_id)

            # Try to get the existing session
            session = ChatSession.objects.filter(id=session_id).first()

            if not session:
                # Create a new session with the given UUID
                session = ChatSession(id=session_id)
                session.save()

        except (ValueError, TypeError):
            # If session_id is invalid or not provided, create a new one
            session = ChatSession.objects.create()

        

        # Save user message
        ChatMessage.objects.create(
            session=session,
            user=request.user,
            role="user",
            content=message
        )

        # Get full message history
        messages = ChatMessage.objects.filter(session=session, user=request.user).order_by("timestamp")
        message_history = [
            {"role": msg.role, "content": msg.content}
            for msg in messages
        ]


        # Send message history to external AI endpoint
        payload = {"messages": message_history}
        # endpoint = "https://penguin-needed-happily.ngrok-free.app/api/bi_v1/stream_chat"
        endpoint = "http://62.72.32.104:9000/api/bi_v1/stream_chat"
        

        response_stream = stream_chat_generator(endpoint, payload, session, request.user)
        return StreamingHttpResponse(response_stream, content_type="text/event-stream")

