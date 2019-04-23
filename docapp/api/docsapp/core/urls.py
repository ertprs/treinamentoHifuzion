from rest_framework import routers

from docsapp.core.views import ProfileViewSet, MenuViewSet, MenuStructureViewSet, ClientViewSet

router = routers.DefaultRouter(trailing_slash=True)

router.register('profiles', ProfileViewSet)
router.register('menus', MenuViewSet)
router.register('appmenus', MenuStructureViewSet, base_name='appmenus')
router.register('clients', ClientViewSet)

urlpatterns = router.urls
