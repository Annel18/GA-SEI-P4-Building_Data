from rest_framework.serializers import ModelSerializer
from ..models import BuildingRegs

class BuildingRegsSerializer(ModelSerializer):
    class Meta:
        model = BuildingRegs 
        fields = '__all__'