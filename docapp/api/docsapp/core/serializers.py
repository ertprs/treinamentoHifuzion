from django.contrib.auth.models import User
from django.db.models import QuerySet
from rest_auth.models import TokenModel
from rest_auth.serializers import LoginSerializer, UserDetailsSerializer, TokenSerializer
from rest_framework import serializers

from .models import Profile


class CustomUserSerializer(UserDetailsSerializer):
    profile = serializers.SerializerMethodField()

    def get_profile(self, user: User):
        return ProfileSerializer(user.profile).data

    class Meta(UserDetailsSerializer.Meta):
        fields = ('profile',)


class CustomTokenSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()

    def get_profile(self, token: TokenModel):
        return ProfileSerializer(token.user.profile).data

    class Meta:
        model = TokenModel
        fields = ('key', 'profile')


class ProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for data profile class
    """

    user_info = serializers.SerializerMethodField()

    # documents = serializers.SerializerMethodField()

    def get_documents(self, profile: Profile) -> list:
        """
        Return all documents for profile
        :param profile:
        :return: list
        """

        return profile.documents

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
