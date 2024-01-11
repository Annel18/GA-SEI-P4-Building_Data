from django.db import models

# Create your models here.
class FloorFinish(models.Model):
    rooms = models.ForeignKey(
        to='rooms.Room', 
        on_delete=models.CASCADE,
        related_name='floorFinishes'
    )

    def __str__(self):
        return f'{self.rooms}'