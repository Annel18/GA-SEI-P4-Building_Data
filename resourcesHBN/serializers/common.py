from rest_framework.serializers import ModelSerializer
from ..models import HBN

class HBNSerializer(ModelSerializer):
    class Meta:
        model = HBN 
        fields = '__all__'