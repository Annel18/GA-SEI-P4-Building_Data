# Generated by Django 5.0.1 on 2024-01-19 14:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('roomTypes', '0025_alter_roomtype_room_img'),
    ]

    operations = [
        migrations.AlterField(
            model_name='roomtype',
            name='room_code',
            field=models.CharField(max_length=255),
        ),
    ]
