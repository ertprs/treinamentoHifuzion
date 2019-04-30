from core.models import User
from rest_auth.models import TokenModel
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    groups = serializers.SerializerMethodField()
    permissions = serializers.SerializerMethodField()

    def get_groups(self, user: User):
        if hasattr(user, 'groups'):
            return [dict(id=g.id, name=g.name) for g in user.groups.all()]
        return []

    def get_permissions(self, user: User):
        if hasattr(user, 'user_permissions'):
            return [dict(id=p.id, name=p.name) for p in user.user_permissions.all()]
        return []

    class Meta:
        model = User
        exclude = ('password', 'user_permissions')


class TokenSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    token = serializers.SerializerMethodField()

    def get_token(self, token: TokenModel):
        return token.key

    def get_user(self, token: TokenModel):
        return UserSerializer(token.user).data

    class Meta:
        model = TokenModel
        fields = ('token', 'user',)
