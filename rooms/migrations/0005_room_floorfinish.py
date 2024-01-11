# Generated by Django 5.0.1 on 2024-01-11 18:20

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('floorFinishes', '0003_remove_floorfinish_rooms'),
        ('rooms', '0004_room_owner'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='floorFinish',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='rooms', to='floorFinishes.floorfinish'),
            preserve_default=False,
        ),
    ]
