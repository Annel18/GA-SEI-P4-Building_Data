from rest_framework.generics import CreateAPIView, DestroyAPIView
from .models import Ceiling
from .serializers.common import CeilingSerializer

# Path: /ceilings/
# Methods: GET, POST
class CeilingCreateView(CreateAPIView):
    queryset = Ceiling.objects.all()
    serializer_class = CeilingSerializer

# Path: /ceilings/:pk
# Methods: DELETE
class CeilingDestroyView(DestroyAPIView):
    queryset = Ceiling.objects.all()
    serializer_class = CeilingSerializer