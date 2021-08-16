from django.contrib import admin
from django.apps import apps
from django.contrib.admin.sites import AlreadyRegistered
from . import models

# Register your models here.

api_models = apps.get_app_config("api").get_models()
for model in api_models:
    try:
        admin.site.register(model)
    except AlreadyRegistered:
        pass

# class ProductsAdmin(admin.ModelAdmin):
#     list_display = [f.name for f in models.ToDoList._meta.fields]


# class CustomersAdmin(admin.ModelAdmin):
#     list_display = [f.name for f in models.ToDoList._meta.fields]


# class SubscriptionsAdmin(admin.ModelAdmin):
#     list_display = [f.name for f in models.ToDoList._meta.fields]


# class HolidayAdmin(admin.ModelAdmin):
#     list_display = [f.name for f in models.ToDoList._meta.fields]


# class OrdersAdmin(admin.ModelAdmin):
#     list_display = [f.name for f in models.ToDoList._meta.fields]


# admin.site.reigster(models.Products, ProductsAdmin)
# admin.site.register(models.Customers, CustomersAdmin)
# admin.site.register(models.)

##############################
##############################
##############################


# class ToDoListAdmin(admin.ModelAdmin):
#     list_display = [f.name for f in models.ToDoList._meta.fields]


# class CategoryAdmin(admin.ModelAdmin):
#     list_display = [f.name for f in models.Category._meta.fields]


# class ToDoItemAdmin(admin.ModelAdmin):
#     list_display = [f.name for f in models.ToDoItem._meta.fields]


# admin.site.register(models.ToDoList, ToDoListAdmin)
# admin.site.register(models.Category, CategoryAdmin)
# admin.site.register(models.ToDoItem, ToDoItemAdmin)
