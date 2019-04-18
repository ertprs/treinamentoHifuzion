from django.db import models
from django.utils.translation import gettext as _

from docsapp.integracao.models import Documento


class Menu(models.Model):
    """
    Model for store frontend menu
    """
    ICONS = (
        ('supervised_user_circle', 'supervised_user_circle'),
        ('featured_play_list', 'featured_play_list'),
        ('account_circle', 'account_circle'),
        ('close', 'close'),
    )

    to = models.CharField(
        verbose_name=_('to'),
        max_length=100,
        unique=True
    )
    icon = models.CharField(
        verbose_name=_('icon'),
        max_length=100,
        choices=ICONS
    )
    relation = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.to


class Profile(models.Model):
    """
    Model for store profile data
    """
    user = models.OneToOneField(
        'auth.User',
        verbose_name=_('user'),
        on_delete=models.CASCADE
    )
    skype = models.CharField(
        verbose_name=_('skype'),
        max_length=100,
        null=True,
        blank=True
    )

    @property
    def documents(self):
        return list(Documento.objects.all().values(
            'id',
            'data_reg',
            'documento',
            'empresa',
            'caixa',
            'prateleira',
            'sessao',
        ))

    class Meta:
        verbose_name = _('profile')
        verbose_name_plural = _('profiles')

    def __str__(self):
        return self.user.username


class Client(models.Model):
    """
    Model for store Client
    """

    PRIVATE = 1
    PUBLIC = 2

    TYPE_PERSON = (
        (PRIVATE, _('Private')),
        (PUBLIC, _('Public')),
    )

    name = models.CharField(verbose_name=_('name'), max_length=100)
    address = models.TextField(verbose_name=_('address'))
    email = models.EmailField(verbose_name=_('email'))
    phone = models.CharField(verbose_name=_('phone'), max_length=20)
    second_phone = models.CharField(verbose_name=_('second phone'), max_length=20, null=True, blank=True)
    type_person = models.IntegerField(default=PUBLIC, choices=TYPE_PERSON)

    def __str__(self):
        return self.name
