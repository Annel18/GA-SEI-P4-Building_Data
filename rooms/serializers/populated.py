from .common import RoomSerializer
from roomTypes.serializers.common import RoomTypeSerializer

class PopulatedRoomSerializer(RoomSerializer):
    roomTypes = RoomTypeSerializer(many=True)