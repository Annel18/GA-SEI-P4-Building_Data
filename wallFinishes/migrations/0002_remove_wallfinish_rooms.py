# Generated by Django 5.0.1 on 2024-01-11 19:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('wallFinishes', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='wallfinish',
            name='rooms',
        ),
    ]