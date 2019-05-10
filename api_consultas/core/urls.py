from rest_framework import routers

from core.views import GroupViewSet, ProductViewSet

r = routers.DefaultRouter(trailing_slash=True)

r.register('groups', GroupViewSet)
r.register('products', ProductViewSet)

urlpatterns = r.urls
