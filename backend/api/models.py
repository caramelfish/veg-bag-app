from django.db import models
from django.db.models.deletion import CASCADE
from django.db.models.fields import DateField
from django.db.models.fields.related import ManyToManyField
from django.utils import timezone


# Create your models here.


############ PRODUCTS ############


class Products(models.Model):
    name = models.CharField(max_length=200, blank=False, unique=True)
    price = models.DecimalField(max_digits=8, decimal_places=2, blank=False)
    size = models.CharField(max_length=200, blank=True)
    contents = models.TextField(blank=True)

    def __str__(self):
        return self.name


############ PACKING LIST ############


class PackingGroups(models.Model):
    name = models.CharField(max_length=20)
    colour = models.CharField(max_length=20)
    type = models.CharField(max_length=20)
    desc = models.TextField()

    def __str__(self):
        return self.name


class PackingListActive(models.Model):
    group = models.ForeignKey(PackingGroups, on_delete=CASCADE, editable=False)
    customers = models.TextField(editable=False)


class PackingListHolidays(models.Model):
    group = models.ForeignKey(PackingGroups, on_delete=CASCADE, editable=False)
    customers = models.TextField(editable=False)


############ CUSTOMERS ############


class Customers(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField()
    balance = models.DecimalField(max_digits=8, decimal_places=2, default=0)


class Subscriptions(models.Model):
    customer = models.ForeignKey(Customers, on_delete=CASCADE)
    items = models.ManyToManyField(Products)
    cost = models.DecimalField(max_digits=8, decimal_places=2)
    start_date = models.DateField()
    end_date = models.DateField()
    active = models.BooleanField(default=True, blank=False)


class Holiday(models.Model):
    customer = models.ForeignKey(Customers, on_delete=CASCADE)
    holiday_start = models.DateField(blank=False)
    holiday_end = models.DateField(blank=False)


############ ORDERS ############


class Orders(models.Model):
    order = models.ForeignKey(Subscriptions, on_delete=CASCADE)
    extras = models.ManyToManyField(Products)
    cost = models.DecimalField(max_digits=8, decimal_places=2)
    date = models.DateField(blank=False, default=timezone.now, editable=False)
    paid = models.BooleanField(blank=False, editable=False)


class Transaction(models.Model):
    CREDIT = "credit"
    DEBIT = "debit"
    MANUAL = "manual"
    TRANSACTION_CHOICES = [(CREDIT, "Credit"), (DEBIT, "Debit"), (MANUAL, "Manual")]
    type = models.CharField(max_length=6, choices=TRANSACTION_CHOICES, blank=False)
    amount = models.DecimalField(max_digits=8, decimal_places=2)
    order = models.ForeignKey(Orders, on_delete=CASCADE, blank=True)
    customer = models.ForeignKey(Customers, on_delete=CASCADE, blank=True)


############ FINANCES ############


class CSV(models.Model):
    csv_file = models.CharField(max_length=50, unique=True)
    date = models.DateField()
    bank_ref = models.CharField(max_length=50)
    desc = models.CharField(max_length=50)
    cust_ref = models.CharField(max_length=50)
    amount = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return self.csv_file


class CSVDefineCustomers(models.Model):
    customer = models.ForeignKey(Customers, on_delete=CASCADE)
    bank_ref = models.CharField(max_length=50)
    cust_ref = models.CharField(max_length=50)
    saved = models.BooleanField(default=False)


##############################
##############################
##############################


class Category(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


class ToDoList(models.Model):
    title = models.CharField(max_length=250)
    content = models.TextField(blank=True)
    category = models.ForeignKey(Category, default="general", on_delete=CASCADE)

    class Meta:
        verbose_name = "To Do List"
        verbose_name_plural = "To Do Lists"

    def __str__(self):
        return self.title


class ToDoItem(models.Model):
    to_do_list = models.ForeignKey(ToDoList, on_delete=CASCADE)
    item = models.TextField()
    created = models.DateField(default=timezone.now)
    due_date = models.DateField(default=timezone.now)

    class Meta:
        ordering = ["-created"]
        verbose_name = "Item"
        verbose_name_plural = "Items"

    def __str__(self):
        return self.item
