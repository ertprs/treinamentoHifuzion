import datetime

from django.db import models
from django.utils import timezone


class ClientManager(models.Manager):

    def birthday_today(self):
        return self.get_queryset().filter(birthday=timezone.now().date())

    def birthday_tomorrow(self):
        return self.get_queryset().filter(birthday=timezone.now().date() + datetime.timedelta(days=1))
