from django.contrib.auth.models import User
from django.db.models import QuerySet
from rest_auth.models import TokenModel
from rest_framework import serializers

from .models import Profile, Menu


class CustomUserSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()

    def get_profile(self, user: User):
        if not hasattr(user, 'profile'):
            return {}
        return ProfileSerializer(user.profile).data

    class Meta:
        model = User
        fields = ('profile',)


class CustomTokenSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()
    token = serializers.SerializerMethodField()

    def get_token(self, token: TokenModel):
        return token.key

    def get_profile(self, token: TokenModel):
        if not hasattr(token.user, 'profile'):
            return {}
        return ProfileSerializer(token.user.profile).data

    class Meta:
        model = TokenModel
        fields = ('token', 'profile',)


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


class MenuSerializer(serializers.ModelSerializer):
    """
    Serializer for Menu model
    """

    submenu = serializers.SerializerMethodField()

    def get_submenu(self, menu: Menu):
        data = Menu.objects.filter(relation=menu.id)
        return MenuSerializer(data, many=True).data

    class Meta:
        model = Menu
        fields = '__all__'
