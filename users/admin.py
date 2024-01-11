from django.contrib import admin, auth
# from .models import User

# Register your models here.
User = auth.get_user_model()
admin.site.register(User)