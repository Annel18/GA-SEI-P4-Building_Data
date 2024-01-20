from django.urls import path
from .views import HBNListCreateView


urlpatterns = [
    path('', HBNListCreateView.as_view())
]