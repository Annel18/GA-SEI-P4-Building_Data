from rest_framework.generics import RetrieveUpdateDestroyAPIView
from lib.views import OwnerListCreateView
from .models import Specification
from .serializers.common import SpecificationSerializer
from .serializers.populated import PopulatedSpecificationSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from lib.permissions import IsOwnerOrReadOnly

# Path: /specifications/
# Methods: GET, POST
class SpecificationCreateView(OwnerListCreateView):
    queryset = Specification.objects.all()
    serializer_class = SpecificationSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

# Path: /specifications/:pk
# Methods: DELETE
class SpecificationDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Specification.objects.all()
    permission_classes = [IsOwnerOrReadOnly]

    def get_serializer_class(self):
        print('self request method -»', self.request.method) 
        if self.request.method == 'PUT':
            return SpecificationSerializer
        return PopulatedSpecificationSerializer