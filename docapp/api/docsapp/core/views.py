from rest_framework import viewsets, permissions

from docsapp.core.models import Profile
from docsapp.core.serializers import ProfileSerializer


class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
    permission_classes = (permissions.DjangoModelPermissions,)
