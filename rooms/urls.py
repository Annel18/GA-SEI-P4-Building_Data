from django.urls import path
from .views import RoomDetailView, RoomListCreateView


urlpatterns = [
    path('', RoomListCreateView.as_view()), 
    path('<int:pk>/', RoomDetailView.as_view()) 
]