from django.db import models
from django.utils.translation import gettext as _

from docsapp.integracao.models import Documento


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
