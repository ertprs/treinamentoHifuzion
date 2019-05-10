from django.db import models
from django.db.models import Count, Sum, Case, When, Value, F, FloatField


class GroupManager(models.Manager):
    """
    Gerenciador de consultas de Grupo
    """

    def resumo_produto(self, id: int = None):
        qs = self.get_queryset().prefetch_related('products').all()
        if id is not None:
            qs = qs.filter(id=id)
        return (
            qs
            .values('description')
            .annotate(
                qtd=Count('products__id', distinct=True),
                vlr=Sum('products__price'),
                vlr_inativo=(
                    Sum(
                        Case(
                            When(products__status=2, then=F('products__price')),
                            When(products__status=1, then=Value('0')),
                            default=Value('0'),
                            output_field=FloatField()
                        )
                    )
                )
            )
        )
