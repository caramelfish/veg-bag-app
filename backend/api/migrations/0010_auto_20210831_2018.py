# Generated by Django 3.2.6 on 2021-08-31 19:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_auto_20210831_1810'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orders',
            name='cost',
            field=models.DecimalField(decimal_places=2, default=0.0, editable=False, max_digits=8),
        ),
        migrations.AlterField(
            model_name='subscription',
            name='cost',
            field=models.DecimalField(decimal_places=2, default=0.0, editable=False, max_digits=8),
        ),
    ]