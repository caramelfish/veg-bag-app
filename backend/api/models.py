from django.db import models
from django.db.models.constraints import UniqueConstraint
from django.db.models.deletion import CASCADE
from django.utils import timezone


# Create your models here.


############ PRODUCTS ############


class Products(models.Model):
    name = models.CharField(max_length=200, blank=False, unique=True)
    price = models.DecimalField(
        max_digits=8, decimal_places=2, blank=False, default=0.00
    )
    size = models.CharField(max_length=200, blank=True, null=True)
    contents = models.TextField(blank=True, null=True)

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


class PackingLists(models.Model):
    group = models.ForeignKey(PackingGroups, on_delete=CASCADE, editable=False)
    customers = models.TextField(editable=False)


# class PackingListHolidays(models.Model):
#     group = models.ForeignKey(PackingGroups, on_delete=CASCADE, editable=False)
#     customers = models.TextField(editable=False)


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
    items = models.ManyToManyField(Products, related_name="items")
    cost = models.DecimalField(
        max_digits=8, decimal_places=2, default=0.00, editable=False, blank=False
    )
    start_date = models.DateField()
    end_date = models.DateField()
    active = models.BooleanField(default=True, blank=False)

    class Meta:
        verbose_name = "Subscription"
        verbose_name_plural = "Subscriptions"

    def __str__(self):
        try:
            return (
                f"{self.customer.first_name} {self.customer.last_name}'s subscription"
            )
        except:
            return "Blank"


# class Holiday(models.Model):
#     customer = models.ForeignKey(Customers, on_delete=CASCADE)
#     holiday_start = models.DateField(blank=False)
#     holiday_end = models.DateField(blank=False)

#     class Meta:
#         verbose_name = "Holiday"
#         verbose_name_plural = "Holidays"

#     def __str__(self):
#         return f"{self.customer} {self.holiday_start} {self.holiday_end}"


############ ORDERS ############


class Orders(models.Model):
    subscription = models.OneToOneField(
        Subscription, on_delete=models.SET_NULL, related_name="order", null=True
    )
    extras = models.ManyToManyField(Products, blank=True)
    cost = models.DecimalField(
        max_digits=8, decimal_places=2, default=0.00, editable=True, blank=False
    )
    date = models.DateTimeField(
        auto_now=False, editable=False, null=True, auto_now_add=False
    )
    week_start = models.DateTimeField(
        editable=False, auto_now=False, null=True, auto_now_add=False
    )
    week_end = models.DateTimeField(
        editable=False, auto_now=False, null=True, auto_now_add=False
    )
    modified_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Order"
        verbose_name_plural = "Orders"
        unique_together = ["subscription", "week_start", "week_end"]

    def __str__(self):
        try:
            return f"{self.subscription.customer.first_name} {self.subscription.customer.last_name}'s order - {self.date}"
        except:
            return "Blank"


CREDIT = "credit"
DEBIT = "debit"
MANUAL = "manual"
TRANSACTION_CHOICES = [(CREDIT, "Credit"), (DEBIT, "Debit"), (MANUAL, "Manual")]


class Transaction(models.Model):
    date = models.DateField()
    type = models.CharField(max_length=6, choices=TRANSACTION_CHOICES, blank=False)
    amount = models.DecimalField(max_digits=8, decimal_places=2)
    order = models.ForeignKey(Orders, on_delete=models.SET_NULL, blank=True, null=True)
    customer = models.ForeignKey(
        Customers, on_delete=models.SET_NULL, blank=True, null=True
    )

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
