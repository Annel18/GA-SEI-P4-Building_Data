# Generated by Django 5.0.1 on 2024-01-13 17:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('roomTypes', '0015_alter_roomtype_room_code'),
    ]

    operations = [
        migrations.AlterField(
            model_name='roomtype',
            name='room_img',
            field=models.CharField(blank=True, null=True),
        ),
    ]