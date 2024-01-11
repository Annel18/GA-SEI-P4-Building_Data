from .common import BuildingSerializer
from roomTypes.serializers.common import RoomTypeSerializer

    # Inside this populated serializer we provide class attributes for each field we wish to populate. Typically, the name of this field is specified on the foreign key field in which the relationship was defined under the related_name key

class PopulatedBuildingSerializer(BuildingSerializer):
    roomTypes = RoomTypeSerializer(many=True)