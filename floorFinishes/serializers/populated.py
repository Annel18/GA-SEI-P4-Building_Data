from .common import FloorFinishSerializer
from roomTypes.serializers.common import RoomTypeSerializer

class PopulatedFloorFinishSerializer(FloorFinishSerializer):
    roomTypes = RoomTypeSerializer(many=True)