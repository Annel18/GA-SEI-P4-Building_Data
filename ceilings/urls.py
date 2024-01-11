from django.urls import path
from .views import CeilingCreateView, CeilingDestroyView


urlpatterns = [
    path('', CeilingCreateView.as_view()), 
    path('<int:pk>/', CeilingDestroyView.as_view()) 
]