# Generated by Django 5.0.1 on 2024-01-10 18:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('roomTypes', '0007_alter_roomtype_ffes_alter_roomtype_room_nbr'),
    ]

    operations = [
        migrations.RenameField(
            model_name='roomtype',
            old_name='room_nbr',
            new_name='rooms',
        ),
    ]
