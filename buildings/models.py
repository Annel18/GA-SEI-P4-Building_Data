from django.db import models

# Create your models here.
class Building(models.Model):
    bldg_code = models.CharField(max_length=10, unique=True)
    bldg_name = models.CharField()
    bldg_img = models.ImageField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    roomTypes = models.ManyToManyField(
        blank=True,
        null=True,
        to='roomTypes.RoomType',
        related_name='buildings'
    )
    owner = models.ForeignKey(
        to='users.User',
        on_delete=models.CASCADE,
        related_name='owned_buildings',
        null=True
    )

    def __str__(self):
        return f'{self.bldg_code} - {self.bldg_name}'