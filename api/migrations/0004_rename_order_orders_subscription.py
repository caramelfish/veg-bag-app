# Generated by Django 3.2.6 on 2021-08-26 12:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_customers_archived'),
    ]

    operations = [
        migrations.RenameField(
            model_name='orders',
            old_name='order',
            new_name='subscription',
        ),
    ]