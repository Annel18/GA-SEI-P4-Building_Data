from rest_framework.serializers import ModelSerializer
from ..models import WallFinish

class WallFinishSerializer(ModelSerializer):
    class Meta:
        model = WallFinish 
        fields = '__all__'