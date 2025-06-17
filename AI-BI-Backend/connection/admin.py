from django.contrib import admin
from .models import UserDatabase, ChatSession, ChatMessage

# Register your models here.


admin.site.register(UserDatabase)
admin.site.register(ChatSession)
admin.site.register(ChatMessage)