# Generated by Django 5.0.1 on 2024-01-11 16:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('roomTypes', '0012_alter_roomtype_area_alter_roomtype_height_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='roomtype',
            name='rooms',
        ),
    ]