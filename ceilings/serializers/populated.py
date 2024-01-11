from .common import CeilingSerializer
from roomTypes.serializers.common import RoomTypeSerializer

class PopulatedRoomSerializer(CeilingSerializer):
    roomTypes = RoomTypeSerializer(many=True)