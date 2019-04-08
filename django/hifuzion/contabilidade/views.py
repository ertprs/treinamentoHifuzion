from rest_framework import viewsets
from hifuzion.contabilidade.serializers import ClienteSerializer, PlanoContaSerializer, TodoSerializer
from hifuzion.contabilidade.models import Cliente, PlanoConta, Todo


class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer


class PlanoContaViewSet(viewsets.ModelViewSet):
    queryset = PlanoConta.objects.all().order_by('nome')
    serializer_class = PlanoContaSerializer

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)


class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
