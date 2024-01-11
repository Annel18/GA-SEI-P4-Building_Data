from .common import FfeSerializer
from ffes.serializers.common import FfeSerializer

class PopulatedFfeSerializer(FfeSerializer):
    records = FfeSerializer(many=True)