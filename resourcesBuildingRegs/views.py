from rest_framework.generics import CreateAPIView
from .models import BuildingRegs
from .serializers.common import BuildingRegsSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly


# Path: /buildingRegsTypes/
# Methods: GET, POST
class BuildingRegsListCreateView(CreateAPIView):
    queryset = BuildingRegs.objects.all()
    serializer_class = BuildingRegsSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
