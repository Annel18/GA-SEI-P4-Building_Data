# Generated by Django 5.0.1 on 2024-01-10 19:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('roomTypes', '0008_rename_room_nbr_roomtype_rooms'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='roomtype',
            name='rooms',
        ),
    ]
