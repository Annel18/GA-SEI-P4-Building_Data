from django.db import models

# Create your models here.
class FloorFinish(models.Model):
    spec_code = models.CharField()
    spec_name= models.CharField()
    owner = models.ForeignKey(
        to='users.User',
        on_delete=models.CASCADE,
        related_name='owned_floors',
        null=True
    )

    def __str__(self):
        return f'{self.spec_code} - {self.spec_name}'