from .common import RoomSerializer
from roomTypes.serializers.common import RoomTypeSerializer
from floorFinishes.serializers.common import FloorFinishSerializer
from wallFinishes.serializers.common import WallFinishSerializer
from ceilings.serializers.common import CeilingSerializer

class PopulatedRoomSerializer(RoomSerializer):
    roomTypes = RoomTypeSerializer(many=True)
    floorFinishes = FloorFinishSerializer(many=True)
    wallFinishes = WallFinishSerializer(many=True)
    ceilings = CeilingSerializer(many=True)