from rest_framework import serializers

from crm.models import Client, Activity


class ClientSerializer(serializers.ModelSerializer):
    """
    Serializer for Client model
    """

    class Meta:
        model = Client
        fields = '__all__'


class ActivitySerializer(serializers.ModelSerializer):
    """
    Serializer for Activity model
    """
    client_display = serializers.SerializerMethodField()
    done = serializers.BooleanField(read_only=True)
    elapsed_time = serializers.CharField(read_only=True)

    def get_client_display(self, activity: Activity):
        return activity.client.name

    class Meta:
        model = Activity
        fields = '__all__'
