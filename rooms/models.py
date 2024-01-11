from django.db import models

# Create your models here.
class Room(models.Model):
    room_nbr = models.CharField(unique=True)
    roomTypes = models.ForeignKey(
        blank=True,
        to='roomTypes.RoomType',
        on_delete=models.CASCADE,
        related_name='rooms'
    ),
    owner = models.ForeignKey(
        to='users.User',
        on_delete=models.CASCADE,
        related_name='owned_rooms',
        null=True
    )

    def __str__(self):
        return f'{self.room_nbr}'