from rest_framework.serializers import ModelSerializer
from ..models import RoomType

class RoomTypeSerializer(ModelSerializer):
    class Meta:
        model = RoomType 
        fields = '__all__'