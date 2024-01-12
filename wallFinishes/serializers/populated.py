from .common import WallFinishSerializer
from roomTypes.serializers.common import RoomTypeSerializer

class PopulatedWallFinishSerializer(WallFinishSerializer):
    roomTypes = RoomTypeSerializer(many=True)