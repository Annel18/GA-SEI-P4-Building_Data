from .common import SpecificationSerializer
from roomTypes.serializers.common import RoomTypeSerializer

class PopulatedSpecificationSerializer(SpecificationSerializer):
    rooms = RoomTypeSerializer(many=True)