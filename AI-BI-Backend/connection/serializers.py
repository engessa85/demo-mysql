from rest_framework import serializers
from .models import UserDatabase

class DBConnectionHandlerSerializers(serializers.ModelSerializer):
    class Meta:
        model = UserDatabase
        fields = "__all__"
        read_only_fields = ["user"]
    
    def create(self, validated_data):
        request = self.context["request"]
        validated_data["user"] = request.user
        return super().create(validated_data)