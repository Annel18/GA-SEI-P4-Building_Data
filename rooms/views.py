from rest_framework.generics import RetrieveUpdateDestroyAPIView
from lib.views import OwnerListCreateView
from .models import Room
from .serializers.common import RoomSerializer
from .serializers.populated import PopulatedRoomSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from lib.permissions import IsOwnerOrReadOnly

# Path: /Rooms/
# Methods: GET, POST
class RoomListCreateView(OwnerListCreateView):
    queryset = Room.objects.all()
    serializer_class = PopulatedRoomSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


# Path: /Rooms/:id
# Methods: GET, PUT/PATCH, DELETE
class RoomDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Room.objects.all()
    # serializer_class = PopulatedRoomSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def get_serializer_class(self):
        print('self request method -»', self.request.method) 
        if self.request.method == 'PUT':
            return RoomSerializer
        return PopulatedRoomSerializer