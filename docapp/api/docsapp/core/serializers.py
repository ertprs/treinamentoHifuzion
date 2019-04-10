from django.db.models import QuerySet
from rest_framework import serializers
from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for data profile class
    """

    user_info = serializers.SerializerMethodField()

    def get_user_info(self, profile: Profile):
        """
        Return user info like a username, email, is_admin, groups and permissions
        :param profile: Get profile data
        :return: A dict with information's
        """
        def list_all_values_from_relation(relation: QuerySet):
            return list(relation.all().values_list('name', flat=True))

        return dict(
            username=profile.user.username,
            email=profile.user.email,
            is_admin=profile.user.is_superuser,
            groups=list_all_values_from_relation(profile.user.groups),
            permissions=list_all_values_from_relation(profile.user.user_permissions)
        )

    class Meta:
        model = Profile
        fields = '__all__'
