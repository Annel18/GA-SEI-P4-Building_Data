from rest_framework.generics import CreateAPIView, DestroyAPIView
from .models import WallFinish
from .serializers.common import WallFinishSerializer

# Path: /WallFinishs/
# Methods: GET, POST
class WallFinishCreateView(CreateAPIView):
    queryset = WallFinish.objects.all()
    serializer_class = WallFinishSerializer

# Path: /WallFinishs/:pk
# Methods: DELETE
class WallFinishDestroyView(DestroyAPIView):
    queryset = WallFinish.objects.all()
    serializer_class = WallFinishSerializer