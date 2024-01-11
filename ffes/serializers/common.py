from rest_framework.serializers import ModelSerializer
from ..models import Ffe

class FfeSerializer(ModelSerializer):
    class Meta:
        model = Ffe 
        fields = '__all__'