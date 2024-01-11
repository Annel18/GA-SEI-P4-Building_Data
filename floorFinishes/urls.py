from django.urls import path
from .views import FloorFinishCreateView


urlpatterns = [
    path('', FloorFinishCreateView.as_view()), 
    # path('<int:pk>/', FloorFinishDetailView.as_view()) 
]