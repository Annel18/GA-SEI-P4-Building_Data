from django.urls import path
from .views import BuildingRegsListCreateView


urlpatterns = [
    path('', BuildingRegsListCreateView.as_view())
]