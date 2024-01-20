from django.db import models

# Create your models here.
class HBN(models.Model):
    hbn_code = models.CharField(max_length=20)
    hbn_name = models.CharField(max_length=255)
    hbn_link = models.CharField(
        max_length=2000,
        blank=True,
        null=True
    )
    hbn_img = models.CharField(
        max_length=2000,
        blank=True,
        null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)



    def __str__(self):
        return f'{self.hbn_code} - {self.hbn_name}'