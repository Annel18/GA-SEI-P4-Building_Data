from rest_framework.generics import ListCreateAPIView, RetrieveAPIView
from .models import HBN
from .serializers.common import HBNSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly


# Path: /buildingRegsTypes/
# Methods: GET, POST
class HBNListCreateView(ListCreateAPIView):
    queryset = HBN.objects.all()
    serializer_class = HBNSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
