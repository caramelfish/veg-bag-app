from rest_framework import views, viewsets
from .serializers import (
    SubscriptionsSerializer,
    ToDoItemSerializer,
    ToDoSerializer,
    CategorySerializer,
    CustomersSerializer,
    OrdersSerializer,
    ProductsSerializer,
)
from .models import (
    ToDoList,
    ToDoItem,
    Category,
    Customers,
    Subscription,
    Orders,
    Products,
)

# Create your views here.

############ CUSTOMERS ############


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


############ ORDERS ############


class OrdersViewSet(viewsets.ModelViewSet):
    queryset = Orders.objects.all()
    serializer_class = OrdersSerializer


##############################
##############################
##############################


class ToDoViewSet(viewsets.ModelViewSet):
    queryset = ToDoList.objects.all()
    serializer_class = ToDoSerializer


class ToDoItemViewSet(viewsets.ModelViewSet):
    queryset = ToDoItem.objects.all()
    serializer_class = ToDoItemSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
