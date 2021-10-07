from rest_framework import serializers
from rest_framework.fields import SerializerMethodField

from .models import (
    Products,
    PackingGroups,
    PackingLists,
    Customers,
    Subscription,
    Orders,
    Transaction,
    CSV,
    CSVDefineCustomers,
)


############ PRODUCTS ############


class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = ["id", "name", "price", "size", "contents"]


############ PACKING LIST ############


class PackingGroupsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PackingGroups
        fields = "__all__"


class PackingListsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PackingLists
        fields = "__all__"


############ CUSTOMERS ############


class CustomersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customers
        fields = "__all__"


class SubscriptionCostSerializer(serializers.Serializer):
    def to_internal_value(self, data):
        pass


class SubscriptionsSerializer(serializers.ModelSerializer):
    items_details = ProductsSerializer(many=True, read_only=True, source="items")
    customer_details = CustomersSerializer(read_only=True, source="customer")
    # cost = SerializerMethodField()

    class Meta:
        model = Subscription
        fields = [
            "id",
            "customer",
            "customer_details",
            "items",
            "items_details",
            "cost",
            "start_date",
            "end_date",
            "active",
        ]

    # def get_cost(self, data):
    #     data = self.SubscriptionsSerializer(data=data)
    #     print("DATA:", data)
    #     # item_costs = []
    #     # for item in self.items_details:
    #     #     item_costs.append(float(item.price))
    #     # total_cost = float(sum(item_costs))
    #     return data

    # def to_internal_value(self, data):
    #     # data = super(SubscriptionsSerializer, self).to_internal_value(data)
    #     print("DATA:", data)
    #     item_costs = []
    #     for item in data["items_details"]:
    #         item_costs.append(float(item["price"]))
    #     data["cost"] = sum(item_costs)
    #     return self

    # def calculate_cost(self, data):
    #     items_cost = []
    #     for item in data["items_details"]:
    #         items_cost.append(float(item["price"]))
    #     return float(sum(items_cost))

    # def create(self, instance):
    #     serializer = SubscriptionsSerializer(data=instance)
    #     serializer.is_valid(raise_exception=True)
    #     cost = self.calculate_cost(serializer.data)
    #     instance["cost"] = cost
    #     return super().create(instance)

    # def update(self, instance):
    #     cost = self.calculate_cost(instance)
    #     instance["cost"] = cost
    #     return super().update(instance)

    def to_representation(self, data):
        data = super(SubscriptionsSerializer, self).to_representation(data)
        item_costs = []
        for item in data["items_details"]:
            item_costs.append(float(item["price"]))
        data["cost"] = sum(item_costs)
        return data


# class HolidaySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Holiday
#         fields = "__all__"


############ ORDERS ############


class OrdersSerializer(serializers.ModelSerializer):
    # def __init__(self, *args, **kwargs):
    #     many = kwargs.pop("many", True)
    #     super(OrdersSerializer, self).__init__(many=many, *args, **kwargs)

    subscription_details = SubscriptionsSerializer(
        read_only=True, source="subscription"
    )
    extras_details = ProductsSerializer(read_only=True, source="extras", many=True)

    class Meta:
        model = Orders
        fields = [
            "id",
            "subscription",
            "subscription_details",
            "extras",
            "extras_details",
            "cost",
            "date",
            "week_start",
            "week_end",
        ]

    #  Defining fields on PUT/POST (takes unvalidated data, performs validation, spits out a python object)
    # def to_internal_value(self, data):
    #     data = super(OrdersSerializer, self).to_internal_value(data)

    #     # Calculating dates (current date, week start date, week end date)
    #     def get_date_ranges(self, foo):
    #         foo["date"] = pendulum.today()
    #         date_now = foo["date"]
    #         foo["week_start"] = date_now.start_of("week")
    #         foo["week_end"] = date_now.end_of("week")
    #         return foo

    #     # Calculating Cost
    #     def calculate_cost(self, bar):
    #         extras_prices = []
    #         if "extras_details" in bar:
    #             for i in bar["extras_details"]:
    #                 extras_prices.append(float(i["price"]))
    #         if "subscription_details" in bar:
    #             if sum(extras_prices) > 0:
    #                 bar["cost"] = float(bar["subscription_details"]["cost"]) + sum(
    #                     extras_prices
    #                 )
    #             else:
    #                 bar["cost"] = bar["subscription_details"]["cost"]
    #         return bar

    #     data = get_date_ranges(self, data)
    #     data = calculate_cost(self, data)

    #     return data

    # Defining fields on GET (takes a python object, spits out a primitive (e.g. dict))
    # def to_representation(self, data):
    #     print(data)
    #     data = super(OrdersSerializer, self).to_representation(data)

    #     return data


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
