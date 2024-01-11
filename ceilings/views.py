from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from lib.views import OwnerListCreateView
from .models import Ceiling
from .serializers.common import CeilingSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from lib.permissions import IsOwnerOrReadOnly

# Path: /ceilings/
# Methods: GET, POST
class CeilingListCreateView(OwnerListCreateView):
    queryset = Ceiling.objects.all()
    serializer_class = CeilingSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

# Path: /ceilings/:id
# Methods: GET, PUT/PATCH, DELETE
class CeilingDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Ceiling.objects.all()
    serializer_class = CeilingSerializer
    permission_classes = [IsOwnerOrReadOnly]

    # def get_serializer_class(self):
    #     print('self request method -»', self.request.method) 
    #     if self.request.method == 'PUT':
    #         return PopulatedCeilingSerializer
    #     return CeilingSerializer