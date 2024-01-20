from django.urls import path
from .views import BuildingRegsListCreateView, BuildingRegsDetailView


urlpatterns = [
    path('', BuildingRegsListCreateView.as_view()),
    path('<int:pk>/', BuildingRegsDetailView.as_view()) 
]