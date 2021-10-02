from django.urls import include, path
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r"subscriptions", views.SubscriptionsViewSet)
router.register(r"orders", views.OrdersViewSet)
router.register(r"customers", views.CustomersViewSet)
router.register(r"products", views.ProductsViewSet)

urlpatterns = router.urls

# [
#     path("", include(router.urls)),
#     path("api-auth/", include("rest_framework.urls", namespace="rest_framwork")),
# ]
