from rest_framework import routers

from crm.views import ActivityViewSet, ClientViewSet

r = routers.DefaultRouter()
r.register('clients', ClientViewSet)
r.register('activities', ActivityViewSet)

urlpatterns = r.urls
