# Generated by Django 3.2.7 on 2021-09-07 21:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0017_auto_20210907_2220'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orders',
            name='date',
            field=models.DateTimeField(editable=False, null=True),
        ),
        migrations.AlterField(
            model_name='orders',
            name='week_end',
            field=models.DateTimeField(editable=False, null=True),
        ),
        migrations.AlterField(
            model_name='orders',
            name='week_start',
            field=models.DateTimeField(editable=False, null=True),
        ),
    ]
