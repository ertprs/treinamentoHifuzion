from rest_framework import routers

from docsapp.core.views import ProfileViewSet, MenuViewSet, ClientViewSet

router = routers.DefaultRouter(trailing_slash=True)

router.register('profiles', ProfileViewSet)
router.register('menus', MenuViewSet)
router.register('clients', ClientViewSet)

urlpatterns = router.urls
