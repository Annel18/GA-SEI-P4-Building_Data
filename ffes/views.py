from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from lib.views import OwnerListCreateView
from .models import Ffe
from .serializers.common import FfeSerializer
# from .serializers.populated import PopulatedFfeSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from lib.permissions import IsOwnerOrReadOnly

# Path: /ffes/
# Methods: GET, POST
class FfeListCreateView(OwnerListCreateView):
    queryset = Ffe.objects.all()
    serializer_class = FfeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

# Path: /ffes/:id
# Methods: GET, PUT/PATCH, DELETE
class FfeDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Ffe.objects.all()
    serializer_class = FfeSerializer
    permission_classes = [IsOwnerOrReadOnly]