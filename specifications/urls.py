from django.urls import path
from .views import SpecificationCreateView, SpecificationDestroyView

urlpatterns = [
    path('', SpecificationCreateView.as_view()),
    path('<int:pk>/', SpecificationDestroyView.as_view())
]