from django.test import TestCase
from .serializers import ProfileSerializer
from .models import Profile
from django.contrib.auth.models import User


class TestProfile(TestCase):
    """
    Test profile operations
    """

    def setUp(self):
        """
        This setup implement new user and new profile
        """
        self.user = User.objects.create_superuser(username='admin',
                                                  password='admin',
                                                  email='admin@email.com')
        self.profile = Profile(user=self.user, skype='adminskp')
        self.profile.save()

    def testSerializerOne(self):
        """
        Should be return dict with infos
        """
        ps = ProfileSerializer(self.profile).data
        self.assertIsInstance(ps, dict)

    def testeSerializerOneHasFields(self):
        """
        Should be check fields into serializer
        """
        fields = ['id', 'user', 'user_info', 'skype']

        ps = ProfileSerializer(self.profile).data
        for field in fields:
            self.assertIn(field, ps.keys())

    def testeSerializerOneUserInfoSubFields(self):
        """
        Should be check user_info fields into serializer
        """
        fields = [
            'username',
            'email',
            'is_admin',
            'groups',
            'permissions',
        ]

        ps = ProfileSerializer(self.profile).data
        for field in fields:
            self.assertIn(field, ps.get('user_info', {}).keys())
