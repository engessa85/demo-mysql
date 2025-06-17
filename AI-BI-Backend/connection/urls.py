from django.urls import path
from . import views

urlpatterns = [
    path("", views.DBConnection.as_view()),
    path("db-connection", views.DBConnectionHandler.as_view(), name="db-connection"),
    path("db-chating/<str:id>", views.DBChatingHandler.as_view(), name="db-chating"),
    path("test-chating", views.TestChat.as_view(), name="test-chating"),
    
]
