from .common import WallFinishSerializer
from rooms.serializers.common import RoomSerializer

    # Inside this populated serializer we provide class attributes for each field we wish to populate. Typically, the name of this field is specified on the foreign key field in which the relationship was defined under the related_name key

class PopulatedWallFinishSerializer(WallFinishSerializer):
    rooms = RoomSerializer(many=True)