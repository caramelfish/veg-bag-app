# Generated by Django 3.2.6 on 2021-08-26 19:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_auto_20210826_1933'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customers',
            name='subscription',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='subscription', to='api.subscriptions'),
        ),
    ]
