from rest_framework.serializers import ModelSerializer
from ..models import Specification

class SpecificationSerializer(ModelSerializer):
    class Meta:
        model = Specification # the model that is used to serialize
        # exclude = 'password' # could add this line if wanted
        fields = '__all__' # which fields to serialize