from django.urls import include, path
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r"todolists", views.ToDoViewSet)
router.register(r"todoitems", views.ToDoItemViewSet)
router.register(r"categories", views.CategoryViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framwork")),
]
