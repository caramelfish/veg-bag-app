# Generated by Django 3.2.7 on 2021-09-01 20:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_auto_20210831_2018'),
    ]

    operations = [
        migrations.AddField(
            model_name='orders',
            name='week_end',
            field=models.DateField(editable=False, null=True),
        ),
        migrations.AddField(
            model_name='orders',
            name='week_start',
            field=models.DateField(editable=False, null=True),
        ),
    ]
