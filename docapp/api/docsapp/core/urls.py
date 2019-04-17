from rest_framework import routers

from docsapp.core.views import ProfileViewSet, MenuViewSet

router = routers.DefaultRouter(trailing_slash=True)

router.register('profiles', ProfileViewSet)
router.register('menus', MenuViewSet)

urlpatterns = router.urls
