# Generated by Django 5.0.1 on 2024-01-11 19:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('buildings', '0002_alter_building_roomtypes'),
    ]

    operations = [
        migrations.AlterField(
            model_name='building',
            name='bldg_code',
            field=models.CharField(max_length=10),
        ),
    ]
