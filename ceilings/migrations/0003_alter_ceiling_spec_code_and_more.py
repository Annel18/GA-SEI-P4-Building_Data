# Generated by Django 5.0.1 on 2024-01-11 19:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ceilings', '0002_remove_ceiling_rooms'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ceiling',
            name='spec_code',
            field=models.CharField(),
        ),
        migrations.AlterField(
            model_name='ceiling',
            name='spec_code_suffix',
            field=models.CharField(),
        ),
    ]