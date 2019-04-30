from rest_framework import serializers

from academy.models import Coach, Athlete, Graduation, Team, Training, Measure


class BaseSerializer(serializers.ModelSerializer):
    """
    Basic setup serializers
    """
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        abstract = True
        fields = '__all__'


class CoachSerializer(BaseSerializer):
    """
    Serializer for model Coach
    """

    class Meta:
        model = Coach
        fields = '__all__'


class AthleteSerializer(BaseSerializer):
    """
    Serializer for model Athlete
    """

    belt = serializers.SerializerMethodField()

    def get_belt(self, obj: Athlete):
        return obj.belt

    class Meta:
        model = Athlete
        fields = '__all__'


class GraduationSerializer(BaseSerializer):
    """
    Serializer for model Graduation
    """

    class Meta:
        model = Graduation
        fields = '__all__'


class TeamSerializer(BaseSerializer):
    """
    Serializer for model Team
    """

    class Meta:
        model = Team
        fields = '__all__'


class TrainingSerializer(BaseSerializer):
    """
    Serializer for model Training
    """

    class Meta:
        model = Training
        fields = '__all__'


class MeasureSerializer(BaseSerializer):
    """
    Serializer for model Measure
    """

    class Meta:
        model = Measure
        fields = '__all__'
