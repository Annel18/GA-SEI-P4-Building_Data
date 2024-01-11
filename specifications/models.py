from django.db import models

# Create your models here.
class Specification(models.Model):
    spec_code = models.CharField(max_length=2000)
    spec_code_suffix = models.CharField()
    spec_title = models.CharField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    floor_finish = models.ForeignKey(
        to='floorFinishes.FloorFinish', 
        on_delete=models.CASCADE,
        related_name='specifications'
    )
    # ceiling_finish = models.ForeignKey(
    #     to='ceilingFinishes.CeilingFinish', 
    #     on_delete=models.CASCADE,
    #     related_name='specifications'
    # )
    # wall_finish = models.ForeignKey(
    #     to='wallFinihes.WallFinish',
    #     on_delete=models.CASCADE,
    #     related_name='specifications'
    # )
    owner = models.ForeignKey(
        to='users.User',
        on_delete=models.CASCADE,
        related_name='owned_specifications',
        null=True
    )

    def __str__(self):
        return f'{self.spec_code} - {self.spec_code_suffix} - {self.spec_title}'