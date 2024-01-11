from rest_framework.generics import CreateAPIView, DestroyAPIView
from .models import FloorFinish
from .serializers.common import FloorFinishSerializer

# Path: /FloorFinishs/
# Methods: GET, POST
class FloorFinishCreateView(CreateAPIView):
    queryset = FloorFinish.objects.all()
    serializer_class = FloorFinishSerializer

# Path: /FloorFinishs/:pk
# Methods: DELETE
class FloorFinishDestroyView(DestroyAPIView):
    queryset = FloorFinish.objects.all()
    serializer_class = FloorFinishSerializer