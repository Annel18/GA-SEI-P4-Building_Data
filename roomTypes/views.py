from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView
from lib.views import OwnerListCreateView
from .models import RoomType
from .serializers.common import RoomTypeSerializer
from .serializers.populated import PopulatedRoomTypeSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from lib.permissions import IsOwnerOrReadOnly

# Path: /roomTypes/
# Methods: GET, POST
class RoomTypeListCreateView(OwnerListCreateView):
    queryset = RoomType.objects.all()
    serializer_class = RoomTypeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

# Path: /roomTypes/:id
# Methods: GET, PUT/PATCH, DELETE
class RoomTypeDetailView(RetrieveUpdateDestroyAPIView):
    queryset = RoomType.objects.all()
    # serializer_class = RoomTypeSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def get_serializer_class(self):
        # print('self request method -»', self.request.method) 
        if self.request.method == 'PUT':
            return RoomTypeSerializer
        return PopulatedRoomTypeSerializer