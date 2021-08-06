from django.db import models
from django.db.models.deletion import CASCADE
from django.utils import timezone

# Create your models here.


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
    created = models.DateField(default=timezone.now())
    due_date = models.DateField(default=timezone.now())

    class Meta:
        ordering = ["-created"]
        verbose_name = "Item"
        verbose_name_plural = "Items"

    def __str__(self):
        return self.item
