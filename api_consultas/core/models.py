from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import User
from core.managers import GroupManager


class Group(models.Model):
    """
    Modelo para guarda dados de grupos de produtos
    """
    objects = GroupManager()

    description = models.CharField(verbose_name=_('Description'),
                                   max_length=100)

    class Meta:
        verbose_name = _('group')
        verbose_name_plural = _('groups')

    def __str__(self):
        return self.description


class Product(models.Model):
    """
    Modelo para guardar dados de produtos
    """
    ACTIVE = 1
    INACTIVE = 2

    STATUS = (
        (ACTIVE, _('Active')),
        (INACTIVE, _('Inactive')),
    )

    description = models.CharField(verbose_name=_('Description'),
                                   max_length=100)
    group = models.ForeignKey(to='core.Group',
                              on_delete=models.DO_NOTHING,
                              verbose_name=_('Group'),
                              related_name='products')
    price = models.FloatField(verbose_name=_('Price'),
                              default=0)
    status = models.IntegerField(default=ACTIVE, choices=STATUS)

    class Meta:
        verbose_name = _('product')
        verbose_name_plural = _('products')

    def __str__(self):
        return self.description


