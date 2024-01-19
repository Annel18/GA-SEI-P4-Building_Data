from django.db import models

# Create your models here.
class RoomType(models.Model):
    room_code = models.CharField(max_length=255)
    room_name = models.CharField(max_length=255)
    area = models.FloatField(blank=True, null=True)
    height = models.FloatField(blank=True, null=True)
    room_img = models.CharField(
        max_length=2000,
        blank=True,
        null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    ffes = models.ManyToManyField(
        blank=True,
        to='ffes.Ffe',
        related_name='roomTypes'
    )
    floorFinishes = models.ForeignKey(
        blank=True,
        null=True,
        on_delete=models.CASCADE,
        to='floorFinishes.FloorFinish', 
        related_name='rooms'
    )
    wallFinishes = models.ForeignKey(
        blank=True,
        null=True,
        on_delete=models.CASCADE,
        to='wallFinishes.WallFinish', 
        related_name='rooms'
    )
    ceilings = models.ForeignKey(
        blank=True,
        null=True,
        on_delete=models.CASCADE,
        to='ceilings.Ceiling', 
        related_name='rooms'
    )
    owner = models.ForeignKey(
        to='users.User',
        on_delete=models.CASCADE,
        related_name='owned_roomTypes',
        null=True
    )

    def __str__(self):
        return f'{self.room_code} - {self.room_name}'