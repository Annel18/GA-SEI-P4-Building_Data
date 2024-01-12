from django.urls import path
from .views import WallFinishListCreateView, WallFinishDetailView


urlpatterns = [
    path('', WallFinishListCreateView.as_view()), 
    path('<int:pk>/', WallFinishDetailView.as_view()) 
]