from rest_framework.generics import RetrieveUpdateDestroyAPIView, UpdateAPIView
from lib.views import OwnerListCreateView
from .models import Building
from .serializers.common import BuildingSerializer
from .serializers.populated import PopulatedBuildingSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from lib.permissions import IsOwnerOrReadOnly

# Path: /buildings/
# Methods: GET, POST
class BuildingListCreateView(OwnerListCreateView):
    queryset = Building.objects.all()
    serializer_class = PopulatedBuildingSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

# Path: /buildings/:id
# Methods: GET, PUT/PATCH, DELETE
class BuildingDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Building.objects.all()
    # serializer_class = BuildingSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def get_serializer_class(self):
        # print('self request method -»', self.request.method) 
        if self.request.method == 'PATCH':
            return BuildingSerializer
        return PopulatedBuildingSerializer
