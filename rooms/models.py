from django.db import models

# Create your models here.
class Room(models.Model):
    room_nbr = models.CharField()
    # floorFinishes = models.ManyToManyField(
    #     blank=True,
    #     to='floorFinishes.FloorFinish', 
    #     related_name='rooms'
    # )
    # wallFinishes = models.ManyToManyField(
    #     blank=True,
    #     to='wallFinishes.WallFinish', 
    #     related_name='rooms'
    # )
    # ceilings = models.ManyToManyField(
    #     blank=True,
    #     to='ceilings.Ceiling', 
    #     related_name='rooms'
    # )
    roomType = models.ForeignKey(
        blank=True,
        null=True,
        to='roomTypes.RoomType',
        on_delete=models.CASCADE,
        related_name='rooms',
    )
    owner = models.ForeignKey(
        to='users.User',
        on_delete=models.CASCADE,
        related_name='owned_rooms',
        null=True
    )

    def __str__(self):
        return f'{self.room_nbr}'