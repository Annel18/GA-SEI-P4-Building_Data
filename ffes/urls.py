from django.urls import path
from .views import FfeListCreateView, FfeDetailView


urlpatterns = [
    path('', FfeListCreateView.as_view()), 
    path('<int:pk>/', FfeDetailView.as_view()) 
]