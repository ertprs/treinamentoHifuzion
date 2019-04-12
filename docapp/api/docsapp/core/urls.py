from rest_framework import routers

from docsapp.core.views import ProfileViewSet

router = routers.DefaultRouter(trailing_slash=True)

router.register('profiles', ProfileViewSet)

urlpatterns = router.urls
