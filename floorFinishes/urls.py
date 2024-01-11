from django.urls import path
from .views import FloorFinishCreateView, FloorFinishDestroyView


urlpatterns = [
    path('', FloorFinishCreateView.as_view()), 
    path('<int:pk>/', FloorFinishDestroyView.as_view()) 
]