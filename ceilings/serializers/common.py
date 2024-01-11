from rest_framework.serializers import ModelSerializer
from ..models import Ceiling

class CeilingSerializer(ModelSerializer):
    class Meta:
        model = Ceiling 
        fields = '__all__'