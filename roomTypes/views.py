from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView
from lib.views import OwnerListCreateView
from .models import RoomType
from .serializers.common import RoomTypeSerializer
from .serializers.populated import PopulatedRoomTypeSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from lib.permissions import IsOwnerOrReadOnly
from rest_framework import status 
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError

# Path: /roomTypes/
# Methods: GET, POST
class RoomTypeListCreateView(OwnerListCreateView):
    queryset = RoomType.objects.prefetch_related('ffes').select_related('floorFinishes').select_related('wallFinishes').select_related('ceilings').all()
    serializer_class = RoomTypeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

# Path: /roomTypes/:id
# Methods: GET, PUT/PATCH, DELETE
class RoomTypeDetailView(RetrieveUpdateDestroyAPIView):
    queryset = RoomType.objects.prefetch_related('ffes').select_related('floorFinishes').select_related('wallFinishes').select_related('ceilings').all()
    serializer_class = RoomTypeSerializer
    # serializer_class = RoomTypeSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def get_serializer_class(self):
        # print('self request method -»', self.request.method) 
        if self.request.method == 'PATCH':
            return RoomTypeSerializer
        return PopulatedRoomTypeSerializer