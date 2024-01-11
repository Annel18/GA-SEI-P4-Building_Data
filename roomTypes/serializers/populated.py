from .common import RoomTypeSerializer
from ffes.serializers.common import FfeSerializer
from rooms.serializers.common import RoomSerializer

    # Inside this populated serializer we provide class attributes for each field we wish to populate. Typically, the name of this field is specified on the foreign key field in which the relationship was defined under the related_name key

class PopulatedRoomTypeSerializer(RoomTypeSerializer):
    ffes = FfeSerializer(many=True)
    rooms = RoomSerializer(many=True)