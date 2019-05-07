from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.core.mail import send_mail
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from core.managers import UserManager


class MailError(models.Model):
    """
    Class for storing error when send mail fails
    """

    date = models.DateTimeField(_('Date'), auto_now_add=True)
    log = models.TextField(_('Log'))
    smtp = models.CharField(_('Smtp'), max_length=100)
    user = models.CharField(_('User'), max_length=100)
    password = models.CharField(_('Password'), max_length=100)

    class Meta:
        verbose_name = _('Email Error')
        verbose_name_plural = _('Emails Errors')

    def __str__(self):
        return self.log


class User(AbstractBaseUser, PermissionsMixin):
    """
    User base class.

    Email and password are required. Other fields are optional.
    """

    email = models.EmailField(_('Email address'), unique=True)
    name = models.CharField(_('Name'), max_length=50, blank=True)
    nickname = models.CharField(_('Nick name'), max_length=30)
    photo = models.ImageField(_('Photo'), upload_to='profile/', blank=True, null=True)
    is_staff = models.BooleanField(
        _('Staff status'),
        default=True,
        help_text=_('Designates whether the user can log into this admin site.'),
    )
    is_active = models.BooleanField(
        _('Active'),
        default=True,
        help_text=_(
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.'
        ),
    )
    date_joined = models.DateTimeField(_('Date joined'), default=timezone.now)

    objects = UserManager()

    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = _('User')
        verbose_name_plural = _('Users')

    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)

    def get_full_name(self):
        """
        Return the first_name plus the last_name, with a space in between.
        """
        full_name = '%s' % self.name
        return full_name.strip()

    def get_short_name(self):
        """Return the short name for the user."""
        return self.name

    def email_user(self, subject, message, from_email=None, **kwargs):
        """Send an email to this user."""
        send_mail(subject, message, from_email, [self.email], **kwargs)
