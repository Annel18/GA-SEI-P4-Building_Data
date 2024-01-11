from rest_framework.serializers import ModelSerializer
from ..models import FloorFinish

class FloorFinishSerializer(ModelSerializer):
    class Meta:
        model = FloorFinish 
        fields = '__all__'