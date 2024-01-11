from django.db import models

# Create your models here.
class FloorFinish(models.Model):
    spec_code = models.CharField(unique=True)
    spec_code_suffix = models.CharField(unique=True)
    spec_title= models.CharField()
    rooms = models.ForeignKey(
        to='rooms.Room', 
        on_delete=models.CASCADE,
        related_name='floorFinishes'
    )
    owner = models.ForeignKey(
        to='users.User',
        on_delete=models.CASCADE,
        related_name='owned_floors',
        null=True
    )

    def __str__(self):
        return f'{self.rooms}'