from re import L
from rest_framework import serializers
from .models import ToDoItem, ToDoList, Category


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
