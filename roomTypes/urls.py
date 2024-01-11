from django.urls import path
from .views import RoomTypeListCreateView, RoomTypeDetailView


urlpatterns = [
    path('', RoomTypeListCreateView.as_view()), 
    path('<int:pk>/', RoomTypeDetailView.as_view()) 
]