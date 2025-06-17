from django.db import models
from django.contrib.auth.models import User
import uuid


class UserDatabase(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    db_hostname = models.CharField(max_length=255, null=True, blank=True)
    db_name = models.CharField(max_length=255, null=True, blank=True, unique=True)
    db_username = models.CharField(max_length=255, null=True, blank=True)
    db_password = models.CharField(max_length=255, null=True, blank=True)
    db_type = models.CharField(max_length=50, choices=[("postgresql", "PostgreSQL"), ("mysql", "MySQL"), ("sqlite", "SQLite")], default="mysql")
    db_schema = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"UserName:-> {self.user} - DBName:-> {self.db_name}"
    




class ChatSession(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)


class ChatMessage(models.Model):
    ROLE_CHOICES = (
        ('user', 'User'),
        ('assistant', 'Assistant'),
    )

    session = models.ForeignKey(ChatSession, on_delete=models.CASCADE, related_name='messages')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="chat_messages")
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - {self.role}: {self.content[:30]}"
