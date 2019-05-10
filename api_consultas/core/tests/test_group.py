from django.test import TestCase

from core.models import Group


class TestGroup(TestCase):

    def test_group_name(self):
        group = Group()
        group.description = 'Ferramentas'
        group.save()

        self.assertEqual(group.description,
                         str(group))

