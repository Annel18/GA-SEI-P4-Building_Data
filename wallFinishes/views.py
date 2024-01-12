from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from lib.views import OwnerListCreateView
from .models import WallFinish
from .serializers.common import WallFinishSerializer
from .serializers.populated import PopulatedWallFinishSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from lib.permissions import IsOwnerOrReadOnly

# Path: /floorFinishs/
# Methods: GET, POST
class WallFinishListCreateView(OwnerListCreateView):
    queryset = WallFinish.objects.all()
    serializer_class = WallFinishSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

# Path: /floorFinishs/:id
# Methods: GET, PUT/PATCH, DELETE
class WallFinishDetailView(RetrieveUpdateDestroyAPIView):
    queryset = WallFinish.objects.all()
    serializer_class = WallFinishSerializer
    permission_classes = [IsOwnerOrReadOnly]
