# Generated by Django 5.0.1 on 2024-01-13 17:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ffes', '0004_alter_ffe_ffe_code'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ffe',
            name='ffe_img',
        ),
    ]