# Generated by Django 3.2.7 on 2021-10-02 15:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0018_auto_20210907_2234'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='todoitem',
            name='to_do_list',
        ),
        migrations.RemoveField(
            model_name='todolist',
            name='category',
        ),
        migrations.DeleteModel(
            name='Category',
        ),
        migrations.DeleteModel(
            name='ToDoItem',
        ),
        migrations.DeleteModel(
            name='ToDoList',
        ),
    ]
