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

    class Meta:
        verbose_name = "Product"
        verbose_name_plural = "Products"

    def __str__(self):
        return self.name


############ PACKING LIST ############


class PackingGroups(models.Model):
    name = models.CharField(max_length=20)
    colour = models.CharField(max_length=20)
    type = models.CharField(max_length=20)
    desc = models.TextField()

    class Meta:
        verbose_name = "Packing Group"
        verbose_name_plural = "Packing Groups"

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
    archived = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Customer"
        verbose_name_plural = "Customers"

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Subscription(models.Model):
    customer = models.OneToOneField(
        Customers, on_delete=CASCADE, related_name="subscription"
    )
    items = models.ManyToManyField(Products)
    cost = models.DecimalField(max_digits=8, decimal_places=2)
    start_date = models.DateField()
    end_date = models.DateField()
    active = models.BooleanField(default=True, blank=False)

    class Meta:
        verbose_name = "Subscription"
        verbose_name_plural = "Subscriptions"


class Holiday(models.Model):
    customer = models.ForeignKey(Customers, on_delete=CASCADE)
    holiday_start = models.DateField(blank=False)
    holiday_end = models.DateField(blank=False)

    class Meta:
        verbose_name = "Holiday"
        verbose_name_plural = "Holidays"

    def __str__(self):
        return f"{self.customer} {self.holiday_start} {self.holiday_end}"


############ ORDERS ############


class Orders(models.Model):
    subscription = models.OneToOneField(Subscription, on_delete=CASCADE)
    extras = models.ManyToManyField(Products)
    cost = models.DecimalField(max_digits=8, decimal_places=2)
    date = models.DateField(blank=False, default=timezone.now, editable=False)

    class Meta:
        verbose_name = "Order"
        verbose_name_plural = "Orders"

    def __str__(self):
        return f"{self.subscription}"


class Transaction(models.Model):
    CREDIT = "credit"
    DEBIT = "debit"
    MANUAL = "manual"
    TRANSACTION_CHOICES = [(CREDIT, "Credit"), (DEBIT, "Debit"), (MANUAL, "Manual")]
    date = models.DateField()
    type = models.CharField(max_length=6, choices=TRANSACTION_CHOICES, blank=False)
    amount = models.DecimalField(max_digits=8, decimal_places=2)
    order = models.ForeignKey(Orders, on_delete=CASCADE, blank=True)
    customer = models.ForeignKey(Customers, on_delete=CASCADE, blank=True)

    class Meta:
        verbose_name = "Transaction"
        verbose_name_plural = "Transactions"

    def __str__(self):
        return f"{self.date} {self.type} {self.amount}"


############ FINANCES ############


class CSV(models.Model):
    csv_file = models.CharField(max_length=50, unique=True)
    date = models.DateField()
    bank_ref = models.CharField(max_length=50)
    desc = models.CharField(max_length=50)
    cust_ref = models.CharField(max_length=50)
    amount = models.DecimalField(max_digits=8, decimal_places=2)

    class Meta:
        verbose_name = "CSV"
        verbose_name_plural = "CSVs"

    def __str__(self):
        return self.csv_file


class CSVDefineCustomers(models.Model):
    customer = models.ForeignKey(Customers, on_delete=CASCADE)
    bank_ref = models.CharField(max_length=50)
    cust_ref = models.CharField(max_length=50)
    saved = models.BooleanField(default=False)

    class Meta:
        verbose_name = "CSV Defined Customer"
        verbose_name_plural = "CSV Defined Customers"

    def __str__(self):
        return self.customer


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
