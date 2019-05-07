from rest_framework import viewsets, response
from rest_framework.decorators import action

from crm.models import Client, Activity
from crm.serializers import ClientSerializer, ActivitySerializer


class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer


class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

    @action(methods=['post'], detail=True)
    def start(self, request, pk=None):
        activity = self.get_object()
        activity.start()
        return response.Response(ActivitySerializer(activity).data)

    @action(methods=['post'], detail=True)
    def finish(self, request, pk=None):
        activity = self.get_object()
        activity.finish()
        return response.Response(ActivitySerializer(activity).data)
