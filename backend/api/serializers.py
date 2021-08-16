from rest_framework import serializers
from .models import (
    ToDoItem,
    ToDoList,
    Category,
    Products,
    PackingGroups,
    PackingListActive,
    PackingListHolidays,
    Customers,
    Subscriptions,
    Holiday,
    Orders,
    Transaction,
    CSV,
    CSVDefineCustomers,
)


############ PRODUCTS ############


class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = "__all__"


############ PACKING LIST ############


class PackingGroupsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PackingGroups
        fields = "__all__"


class PackingListActiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = PackingListActive
        fields = "__all__"


class PackingListHolidaysSerializer(serializers.ModelSerializer):
    class Meta:
        model = PackingListHolidays
        fields = "__all__"


############ CUSTOMERS ############


class CustomersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customers
        fields = "__all__"


class SubscriptionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscriptions
        fields = "__all__"


class HolidaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Holiday
        fields = "__all__"


############ ORDERS ############


class OrdersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orders
        fields = "__all__"


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = "__all__"


############ FINANCES ############


class CSVSerializer(serializers.ModelSerializer):
    class Meta:
        model = CSV
        fields = "__all__"


class CSVDefineCustomersSerializer(serializers.ModelSerializer):
    class Meta:
        model = CSVDefineCustomers
        fields = "__all__"


##############################
##############################
##############################


class ToDoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDoList
        fields = "__all__"


class ToDoItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDoItem
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"
