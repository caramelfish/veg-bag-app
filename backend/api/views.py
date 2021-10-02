from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
import pendulum

from .serializers import (
    SubscriptionsSerializer,
    CustomersSerializer,
    OrdersSerializer,
    ProductsSerializer,
)
from .models import (
    Customers,
    Subscription,
    Orders,
    Products,
)

# Create your views here.

# MODELVIEWSET FUNCTIONS
# POST: create()
# GET 1: retrieve()
# GET MANY: list()
# PUT: update()
# PATCH: partial_update()
# DELETE: destroy()

############ PRODUCTS ############


class ProductsViewSet(viewsets.ModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer


############ CUSTOMERS ############


class CustomersViewSet(viewsets.ModelViewSet):
    queryset = Customers.objects.all()
    serializer_class = CustomersSerializer


############ SUBSCRIPTIONS ############


class SubscriptionsViewSet(viewsets.ModelViewSet):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionsSerializer

    def retrieve(self, request, *args, **kwargs):
        data = super().retrieve(request, *args, **kwargs)
        # Get current date
        date_now = pendulum.now()
        # Get request data date
        object_end_date = pendulum.parse(data.data["end_date"], tz="Europe/London")

        # If the current date is past the subscription end date
        if date_now > object_end_date:
            print("True")

            # Get the subscription object
            instance = Subscription.objects.get(id=data.data["id"])
            print(instance)

            # Mark the subscription as inactive
            Subscription.objects.update(active=False)

            # Return the new subscription as a response
            serializer = SubscriptionsSerializer(instance=instance)

            return Response(data=serializer.data)

        # Otherwise return the request without modifying the object
        else:
            return super().retrieve(request, *args, **kwargs)

    # def calculate_sub_cost(self, data):
    #     return data

    # def create(self, request, *args, **kwargs):
    #     print("REQUEST DATA", request.data)
    #     # Check if the subscription already exists
    #     instance = Subscription.objects.filter(customer=request.data["customer"])
    #     # If instance has data, subscription exists so exit function early
    #     if len(instance) > 0:
    #         # Get the existing subscription
    #         existing_sub = Subscription.objects.get(customer=request.data["customer"])
    #         return Response(
    #             f"Subscription already exists for this customer. Here is the subscription name: {existing_sub}",
    #             status=status.HTTP_303_SEE_OTHER,
    #         )
    #     # If instance does not have data, create the instance
    #     else:
    #         sub = request.data

    #         # Convert request.data sub['active'] to appropriate field type
    #         def sub_active(sub):
    #             if sub["active"] == "true":
    #                 return True
    #             if sub["active"] == "false":
    #                 return False

    #         customer_instance = Customers.objects.get(id=sub["customer"])
    #         instance = Subscription.objects.create(
    #             customer=customer_instance,
    #             start_date=sub["start_date"],
    #             end_date=sub["end_date"],
    #             active=sub_active(sub),
    #         )

    #         # Setting the items
    #         instance.items.set(sub["items"])

    #         return Response(request.data, status=status.HTTP_201_CREATED)


############ ORDERS ############


class OrdersViewSet(viewsets.ModelViewSet):
    queryset = Orders.objects.all()
    serializer_class = OrdersSerializer

    # Get dates
    def get_date_ranges(self):
        # Init order dictionary
        order = {}
        order["date"] = pendulum.today()
        order["week_start"] = order["date"]._start_of_week()
        order["week_end"] = order["date"]._end_of_week()
        print("ORDER DATES", order)
        # Return order dictionary with dates calculated
        return order

    # Calculate cost
    def calculate_order_cost(self, order, sub):
        order["cost"] = sub["cost"]
        return order

    def update_order_cost(self, data):
        print("Update_order_cost data", data)
        # Get sub cost
        sub_cost = data["subscription_details"]["cost"]
        print("SUB COST", sub_cost)
        # Get extras cost
        extra_costs = []
        for extra in data["extras_details"]:
            extra_costs.append(float(extra["price"]))
        extra_total = float(sum(extra_costs))
        print("EXTRA TOTAL", extra_total)
        # Set order cost
        data["cost"] = extra_total + sub_cost
        return data

    def update(self, request, *args, **kwargs):
        # Get current instance to be updated
        instance = self.get_object()
        # Check request.data
        print("REQUEST.DATA", request.data)
        # Remove extras details and cost to remove previous values
        del request.data["extras_details"]
        del request.data["cost"]
        print("REQUEST.DATA WITH EXTRAS_DETAILS DELETED", request.data)
        # Serialize the data to get new extras_details
        serializer = self.get_serializer(instance=instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        print("SERIALIZER VALIDATED DATA", serializer.validated_data)
        # Update the instance
        self.perform_update(serializer)

        # Calculate order cost and return serializer data
        serializer_2_data = self.update_order_cost(serializer.data)
        # Update the instance again (with costs calculated)
        serializer_2 = self.get_serializer(instance=instance, data=serializer_2_data)
        serializer_2.is_valid(raise_exception=True)
        print("SECOND SERIALIZER VALIDATED DATA", serializer_2.validated_data)
        self.perform_update(serializer_2)

        # Define headers
        headers = self.get_success_headers(serializer_2.data)

        # Return responseD
        return Response(
            data=serializer_2.data, status=status.HTTP_201_CREATED, headers=headers
        )

    # Custom post function to generate 1 order for each subscription for the current week
    @action(detail=False, methods=["post"])
    def generate_orders(self, request, pk=None):
        # Get all subscriptions
        subs = Subscription.objects.all()
        # Serialize all subscriptions
        serializer = SubscriptionsSerializer(subs, many=True)
        print("Serializer data:", serializer.data)
        # Create orders list (for Response data)
        orders_response = []
        # For each serialized subscription...
        for sub in serializer.data:
            # Check the subscription is active
            if sub["active"] == True:
                print("Sub:", sub)
                # Get dates and cost
                order = self.get_date_ranges()
                order = self.calculate_order_cost(order, sub)
                print("Order", order)
                # orders = Orders.objects.all()
                # orders_serializer = OrdersSerializer(orders, many=True)
                # for object in orders_serializer.data:
                #     print("ORDER OBJECT", object)
                # Check if the order instance already exists
                instance = Orders.objects.filter(
                    subscription__id=sub["id"],
                    week_start=order["week_start"],
                    week_end=order["week_end"],
                )
                print("instance:", instance)
                # If the instance has data, the order exists, so pass
                if len(instance) > 0:
                    pass
                # If the instance has no data (does not exist), we need to create the instance
                else:
                    # Get the subscription ID we want to create the order for
                    sub_instance = Subscription.objects.get(id=sub["id"])
                    # Create the order instance
                    Orders.objects.create(
                        subscription=sub_instance,
                        cost=order["cost"],
                        week_start=order["week_start"],
                        week_end=order["week_end"],
                        date=order["date"],
                    )
                # Define response
                order_response = {}
                order_response["subscription"] = sub
                order_response["cost"] = order["cost"]
                order_response["date"] = order["date"]
                order_response["week_start"] = order["week_start"]
                order_response["week_end"] = order["week_end"]
                orders_response.append(order_response)
        return Response(orders_response)

        # # try:
        # # Serialize the data to generate date fields and object ID
        # print("0")
        # serializer = self.get_serializer(
        #     data=order_data, many=isinstance(order_data, list)
        # )
        # print("Lovely")
        # # Check serializer passes validation
        # if serializer.is_valid(raise_exception=False):
        #     print("1")
        #     serializer.save()
        #     return Response(serializer.data)
        # else:
        #     print("2")
        #     return Response("This is an error")

    # @action(detail=False, methods=["post"])
    # def generate_orders(self, request, pk=None):
    #     # Get all subscriptions
    #     subs = Subscription.objects.all()
    #     order_data = []
    #     # For each subscription...
    #     for sub in subs:
    #         sub_data = {}
    #         sub_data["subscription"] = sub.id
    #         order_data.append(sub_data)

    #     # try:
    #     # Serialize the data to generate date fields and object ID
    #     print("0")
    #     serializer = self.get_serializer(
    #         data=order_data, many=isinstance(order_data, list)
    #     )
    #     print("Lovely")
    #     # Check serializer passes validation
    #     if serializer.is_valid(raise_exception=False):
    #         print("1")
    #         serializer.save()
    #         return Response(serializer.data)
    #     else:
    #         print("2")
    #         return Response("This is an error")

    # except IntegrityError:
    #     content = {"error": "IntegrityError"}
    #     return Response(content)

    #     # Check if an order(s) already exists for this subscription (by matching 'subscription' field which is an id)
    #     try:
    #         order = Orders.objects.get(
    #             subscription=serializer.validated_data["subscription"]
    #         )
    #         # Check the order(s) dates (it may be that the sub matches, but the dates are different in which case we want to create the order)
    #         #  ----------------------
    #         # if order not placed for this week, create order
    #         if order["week_start"] != serializer.validated_data["week_start"]:
    #             create_order = Orders.objects.create(
    #                 subscription=serializer.validated_data["subscription"]
    #             )
    #             return Response(
    #                 {"subscription": serializer.validated_data["subscription"]},
    #                 status=status.HTTP_201_CREATED,
    #             )
    #         # if order has been placed for this week, just update the order
    #         else:
    #             update_order = Orders.objects.update(
    #                 subscription=serializer.validated_data["subscription"]
    #             )
    #             return Response(
    #                 {"subscription": serializer.validated_data["subscription"]},
    #                 status=status.HTTP_202_ACCEPTED,
    #             )

    #     except Orders.DoesNotExist:
    #         # No orders exist for this subscription, so create the order
    #         order = Orders.objects.create(
    #             subscription=serializer.validated_data["subscription"]
    #         )
    #         return Response(
    #             {"subscription": serializer.validated_data["subscription"]},
    #             status=status.HTTP_201_CREATED,
    #         )

    # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)

    #     # Check the date of the order is within a date range

    #     # If an order has been made for this subscription within this date range already, don't create the order

    #     # If no order has been made for this subscription within this date range, create the order
    #     self.perform_create(serializer)
    #     headers = self.get_success_headers(serializer.data)
    #     return Response(
    #         serializer.data, status=status.HTTP_201_CREATED, headers=headers
    #     )

    # def create(self, request, *args, **kwargs):
    #     serializer = SubscriptionsSerializer(data=request.data)
    #     if serializer.is_valid():
    #         costs = []
    #         for item in serializer.validated_data["items_details"]:
    #             costs.append(item.price)
    #         serializer["cost"] = sum(costs)
    #     self.perform_create(serializer)
    #     return super().create(request, *args, **kwargs)
