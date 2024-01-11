from django.urls import path
from .views import CeilingListCreateView, CeilingDetailView


urlpatterns = [
    path('', CeilingListCreateView.as_view()), 
    path('<int:pk>/', CeilingDetailView.as_view()) 
]