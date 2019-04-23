from rest_framework import viewsets, response, mixins

from docsapp.core.models import Profile, Menu, Client
from docsapp.core.serializers import ProfileSerializer, MenuSerializer, ClientSerializer


class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()


class MenuViewSet(viewsets.ModelViewSet):
    serializer_class = MenuSerializer
    queryset = Menu.objects.all()


class MenuStructureViewSet(viewsets.ViewSet):

    def montar_menu(self, menu):
        return {
            'to': menu.to,
            'icon': menu.icon,
            'submenu': [self.montar_menu(m) for m in Menu.objects.filter(relation=menu.id)]
        }

    def list(self, request, *args, **kwargs):
        menus = [self.montar_menu(m) for m in Menu.objects.filter(relation=None)]
        return response.Response(menus)


class ClientViewSet(viewsets.ModelViewSet):
    serializer_class = ClientSerializer
    queryset = Client.objects.all()
