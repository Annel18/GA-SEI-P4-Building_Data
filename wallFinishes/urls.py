from django.urls import path
from .views import WallFinishCreateView, WallFinishDestroyView


urlpatterns = [
    path('', WallFinishCreateView.as_view()), 
    path('<int:pk>/', WallFinishDestroyView.as_view()) 
]