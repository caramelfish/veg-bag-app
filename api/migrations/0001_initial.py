# Generated by Django 3.2.6 on 2021-08-17 12:06

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
            options={
                'verbose_name': 'Category',
                'verbose_name_plural': 'Categories',
            },
        ),
        migrations.CreateModel(
            name='CSV',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('csv_file', models.CharField(max_length=50, unique=True)),
                ('date', models.DateField()),
                ('bank_ref', models.CharField(max_length=50)),
                ('desc', models.CharField(max_length=50)),
                ('cust_ref', models.CharField(max_length=50)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=8)),
            ],
            options={
                'verbose_name': 'CSV',
                'verbose_name_plural': 'CSVs',
            },
        ),
        migrations.CreateModel(
            name='Customers',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=50)),
                ('last_name', models.CharField(max_length=50)),
                ('email', models.EmailField(max_length=254)),
                ('balance', models.DecimalField(decimal_places=2, default=0, max_digits=8)),
            ],
            options={
                'verbose_name': 'Customer',
                'verbose_name_plural': 'Customers',
            },
        ),
        migrations.CreateModel(
            name='Orders',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cost', models.DecimalField(decimal_places=2, max_digits=8)),
                ('date', models.DateField(default=django.utils.timezone.now, editable=False)),
                ('paid', models.BooleanField(editable=False)),
            ],
            options={
                'verbose_name': 'Order',
                'verbose_name_plural': 'Orders',
            },
        ),
        migrations.CreateModel(
            name='PackingGroups',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
                ('colour', models.CharField(max_length=20)),
                ('type', models.CharField(max_length=20)),
                ('desc', models.TextField()),
            ],
            options={
                'verbose_name': 'Packing Group',
                'verbose_name_plural': 'Packing Groups',
            },
        ),
        migrations.CreateModel(
            name='Products',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, unique=True)),
                ('price', models.DecimalField(decimal_places=2, max_digits=8)),
                ('size', models.CharField(blank=True, max_length=200)),
                ('contents', models.TextField(blank=True)),
            ],
            options={
                'verbose_name': 'Product',
                'verbose_name_plural': 'Products',
            },
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('type', models.CharField(choices=[('credit', 'Credit'), ('debit', 'Debit'), ('manual', 'Manual')], max_length=6)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=8)),
                ('customer', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='api.customers')),
                ('order', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='api.orders')),
            ],
            options={
                'verbose_name': 'Transaction',
                'verbose_name_plural': 'Transactions',
            },
        ),
        migrations.CreateModel(
            name='ToDoList',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=250)),
                ('content', models.TextField(blank=True)),
                ('category', models.ForeignKey(default='general', on_delete=django.db.models.deletion.CASCADE, to='api.category')),
            ],
            options={
                'verbose_name': 'To Do List',
                'verbose_name_plural': 'To Do Lists',
            },
        ),
        migrations.CreateModel(
            name='ToDoItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('item', models.TextField()),
                ('created', models.DateField(default=django.utils.timezone.now)),
                ('due_date', models.DateField(default=django.utils.timezone.now)),
                ('to_do_list', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.todolist')),
            ],
            options={
                'verbose_name': 'Item',
                'verbose_name_plural': 'Items',
                'ordering': ['-created'],
            },
        ),
        migrations.CreateModel(
            name='Subscriptions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cost', models.DecimalField(decimal_places=2, max_digits=8)),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('active', models.BooleanField(default=True)),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.customers')),
                ('items', models.ManyToManyField(to='api.Products')),
            ],
            options={
                'verbose_name': 'Subscription',
                'verbose_name_plural': 'Subscriptions',
            },
        ),
        migrations.CreateModel(
            name='PackingListHolidays',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('customers', models.TextField(editable=False)),
                ('group', models.ForeignKey(editable=False, on_delete=django.db.models.deletion.CASCADE, to='api.packinggroups')),
            ],
        ),
        migrations.CreateModel(
            name='PackingListActive',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('customers', models.TextField(editable=False)),
                ('group', models.ForeignKey(editable=False, on_delete=django.db.models.deletion.CASCADE, to='api.packinggroups')),
            ],
        ),
        migrations.AddField(
            model_name='orders',
            name='extras',
            field=models.ManyToManyField(to='api.Products'),
        ),
        migrations.AddField(
            model_name='orders',
            name='order',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.subscriptions'),
        ),
        migrations.CreateModel(
            name='Holiday',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('holiday_start', models.DateField()),
                ('holiday_end', models.DateField()),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.customers')),
            ],
            options={
                'verbose_name': 'Holiday',
                'verbose_name_plural': 'Holidays',
            },
        ),
        migrations.CreateModel(
            name='CSVDefineCustomers',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bank_ref', models.CharField(max_length=50)),
                ('cust_ref', models.CharField(max_length=50)),
                ('saved', models.BooleanField(default=False)),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.customers')),
            ],
            options={
                'verbose_name': 'CSV Defined Customer',
                'verbose_name_plural': 'CSV Defined Customers',
            },
        ),
    ]