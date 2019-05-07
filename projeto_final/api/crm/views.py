from rest_framework import viewsets, response
from rest_framework.decorators import action

from crm.models import Client, Activity
from crm.serializers import ClientSerializer, ActivitySerializer


class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.filter(disabled=False)
    serializer_class = ClientSerializer

    @action(methods=['post'], detail=True)
    def disabled(self, request, pk=None):
        client = self.get_object()
        client.disabled = True
        client.save()
        return response.Response(ClientSerializer(client).data)


class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    filter_fields = ('client',)

    @action(methods=['get'], detail=False)
    def dones(self, request, pk=None):
        activities = self.queryset.exclude(finish_at=None)
        return response.Response(ActivitySerializer(activities, many=True).data)

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
