from rest_framework import viewsets

from docsapp.core.models import Profile, Menu, Client
from docsapp.core.serializers import ProfileSerializer, MenuSerializer, ClientSerializer


class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()


class MenuViewSet(viewsets.ModelViewSet):
    serializer_class = MenuSerializer
    queryset = Menu.objects.filter(relation=None)


class ClientViewSet(viewsets.ModelViewSet):
    serializer_class = ClientSerializer
    queryset = Client.objects.all()
