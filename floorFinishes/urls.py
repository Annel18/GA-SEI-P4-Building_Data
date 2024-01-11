from django.urls import path
from .views import FloorFinishListCreateView, FloorFinishDetailView


urlpatterns = [
    path('', FloorFinishListCreateView.as_view()), 
    path('<int:pk>/', FloorFinishDetailView.as_view()) 
]