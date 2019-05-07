from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from crm.managers import ClientManager


class Client(models.Model):
    """
    Model for storing client data
    """
    name = models.CharField(_('Name'), max_length=100)
    nick_name = models.CharField(_('Nick name'), max_length=100)
    email = models.EmailField(_('Email'))
    phone = models.CharField(_('Phone'), max_length=20, null=True, blank=True)
    mobile_phone = models.CharField(_('Mobile phone'), max_length=20)
    birthday = models.DateField(_('Birthday'))
    disabled = models.BooleanField(default=False)

    objects = ClientManager()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _('Client')
        verbose_name_plural = _('Clients')


class Activity(models.Model):
    """
    Model for storing clients activities
    """
    client = models.ForeignKey('crm.Client', verbose_name=_('Client'), on_delete=models.DO_NOTHING)
    title = models.CharField(_('Title'), max_length=100)
    description = models.TextField(_('Description'))
    start_at = models.DateTimeField(_('Start at'), null=True, blank=True)
    finish_at = models.DateTimeField(_('Finish at'), null=True, blank=True)

    def start(self):
        self.start_at = timezone.now()
        self.save()

    def finish(self):
        if self.start_at is None:
            self.start()
        self.finish_at = timezone.now()
        self.save()

    @property
    def done(self):
        return self.finish_at is not None

    @property
    def elapsed_time(self):

        if not self.start_at or not self.finish_at:
            return None
        return self.finish_at - self.start_at

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = _('Activity')
        verbose_name_plural = _('Activities')
