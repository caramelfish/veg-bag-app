from django.contrib import admin
from . import models

# Register your models here.


class ToDoListAdmin(admin.ModelAdmin):
    list_display = [f.name for f in models.ToDoList._meta.fields]


class CategoryAdmin(admin.ModelAdmin):
    list_display = [f.name for f in models.Category._meta.fields]


class ToDoItemAdmin(admin.ModelAdmin):
    list_display = [f.name for f in models.ToDoItem._meta.fields]


admin.site.register(models.ToDoList, ToDoListAdmin)
admin.site.register(models.Category, CategoryAdmin)
admin.site.register(models.ToDoItem, ToDoItemAdmin)
