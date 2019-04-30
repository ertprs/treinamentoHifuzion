from rest_framework import viewsets

from academy.models import Coach, Athlete, Graduation, Team, Training, Measure
from academy.serializers import (
    CoachSerializer,
    AthleteSerializer,
    GraduationSerializer,
    TeamSerializer,
    TrainingSerializer,
    MeasureSerializer
)


class CoachViewSet(viewsets.ModelViewSet):
    """
    ViewSet for model Coach
    """
    serializer_class = CoachSerializer
    queryset = Coach.objects.all()


class AthleteViewSet(viewsets.ModelViewSet):
    """
    ViewSet for model Athlete
    """
    serializer_class = AthleteSerializer
    queryset = Athlete.objects.all()


class GraduationViewSet(viewsets.ModelViewSet):
    """
    ViewSet for model Graduation
    """
    serializer_class = GraduationSerializer
    queryset = Graduation.objects.all()


class TeamViewSet(viewsets.ModelViewSet):
    """
    ViewSet for model Team
    """
    serializer_class = TeamSerializer
    queryset = Team.objects.all()


class TrainingViewSet(viewsets.ModelViewSet):
    """
    ViewSet for model Training
    """
    serializer_class = TrainingSerializer
    queryset = Training.objects.all()


class MeasureViewSet(viewsets.ModelViewSet):
    """
    ViewSet for model Measure
    """
    serializer_class = MeasureSerializer
    queryset = Measure.objects.all()
