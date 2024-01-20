from django.db import models

# Create your models here.
class BuildingRegs(models.Model):
    reg_name = models.CharField(max_length=255)
    reg_link = models.CharField(
        max_length=2000,
        blank=True,
        null=True
    )
    reg_img = models.CharField(
        max_length=2000,
        blank=True,
        null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)



    def __str__(self):
        return f'{self.reg_name}'