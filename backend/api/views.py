from rest_framework import viewsets
from .serializers import ToDoItemSerializer, ToDoSerializer, CategorySerializer
from .models import ToDoList, ToDoItem, Category

# Create your views here.


class ToDoViewSet(viewsets.ModelViewSet):
    queryset = ToDoList.objects.all()
    serializer_class = ToDoSerializer


class ToDoItemViewSet(viewsets.ModelViewSet):
    queryset = ToDoItem.objects.all()
    serializer_class = ToDoItemSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
