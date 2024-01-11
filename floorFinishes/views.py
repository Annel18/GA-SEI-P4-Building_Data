from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from lib.views import OwnerListCreateView
from .models import FloorFinish
from .serializers.common import FloorFinishSerializer
from .serializers.populated import PopulatedFloorFinishSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from lib.permissions import IsOwnerOrReadOnly

# Path: /floorFinishs/
# Methods: GET, POST
class FloorFinishListCreateView(OwnerListCreateView):
    queryset = FloorFinish.objects.all()
    serializer_class = FloorFinishSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

# Path: /floorFinishs/:id
# Methods: GET, PUT/PATCH, DELETE
class FloorFinishDetailView(RetrieveUpdateDestroyAPIView):
    queryset = FloorFinish.objects.all()
    serializer_class = FloorFinishSerializer
    permission_classes = [IsOwnerOrReadOnly]

    # def get_serializer_class(self):
    #     print('self request method -»', self.request.method) 
    #     if self.request.method == 'PUT':
    #         return PopulatedFloorFinishSerializer
    #     return FloorFinishSerializer