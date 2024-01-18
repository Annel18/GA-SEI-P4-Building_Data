from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    img = models.CharField(max_length=2000, blank=True, null=True)
    bio = models.TextField(max_length=300, blank=True, null=True)

    def __str__(self):
        return self.username
