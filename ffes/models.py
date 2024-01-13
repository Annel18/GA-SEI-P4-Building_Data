from django.db import models

# Create your models here.
class Ffe(models.Model):
    ffe_code = models.CharField(max_length=10, )
    ffe_name = models.CharField()
    ffe_group = models.CharField(max_length=1)
    # ffe_img = models.ImageField(blank=True, null=True)
    owner = models.ForeignKey(
        to='users.User',
        on_delete=models.CASCADE,
        related_name='owned_ffes',
        null=True
    )


    def __str__(self):
        return f'{self.ffe_code} - {self.ffe_name}'