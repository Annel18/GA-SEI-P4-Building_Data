# Generated by Django 5.0.1 on 2024-01-11 18:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('rooms', '0006_remove_room_floorfinish'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='room',
            name='room_nbr',
        ),
    ]
