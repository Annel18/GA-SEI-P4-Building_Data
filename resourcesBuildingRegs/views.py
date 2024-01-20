from rest_framework.generics import ListCreateAPIView, RetrieveAPIView
from .models import BuildingRegs
from .serializers.common import BuildingRegsSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly


# Path: /buildingRegsTypes/
# Methods: GET, POST
class BuildingRegsListCreateView(ListCreateAPIView):
    queryset = BuildingRegs.objects.all()
    serializer_class = BuildingRegsSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

# Path: /buildingRegsTypes/:id
# Methods: GET
class BuildingRegsDetailView(RetrieveAPIView):
    queryset = BuildingRegs.objects.all()
    serializer_class = BuildingRegsSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]