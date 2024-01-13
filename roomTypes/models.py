from django.db import models

# Create your models here.
class RoomType(models.Model):
    room_code = models.CharField(max_length=10, )
    room_name = models.CharField()
    area = models.FloatField(blank=True, null=True)
    height = models.FloatField(blank=True, null=True)
    room_img = models.CharField(blank=True, null=True)
    # room_img = models.ImageField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    ffes = models.ManyToManyField(
        blank=True,
        to='ffes.Ffe',
        related_name='roomTypes'
    )
    # rooms = models.ForeignKey(
    #     to='rooms.Room',
    #     on_delete=models.CASCADE,
    #     related_name='roomTypes',
    #     null=True
    # ),
    # rooms= models.ManyToManyField(
    #     blank=True,
    #     null=True,
    #     to='rooms.Room',
    #     related_name='roomTypes'
    # )
    owner = models.ForeignKey(
        to='users.User',
        on_delete=models.CASCADE,
        related_name='owned_roomTypes',
        null=True
    )

    def __str__(self):
        return f'{self.room_code} - {self.room_name}'