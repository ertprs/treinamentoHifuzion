from distutils.command.upload import upload

from django.db import models


class BaseIntegracao(models.Model):
    INTEGRADA = 'I'
    PROCESSANDO = 'P'
    ERRO = 'E'

    STATUS_INTEGRACAO = (
        (INTEGRADA, 'Integrada'),
        (PROCESSANDO, 'Em processamento'),
        (ERRO, 'Erro'),
    )

    integracao_status = models.CharField(max_length=1, choices=STATUS_INTEGRACAO, default=PROCESSANDO)
    integracao_inicio = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    integracao_finalizada = models.DateTimeField(null=True, blank=True)
    integracao_log = models.TextField(null=True, blank=True)

    class Meta:
        abstract = True


class LogErro(models.Model):
    classe = models.CharField(max_length=100)
    log = models.TextField()
    data = models.DateTimeField(auto_now_add=True)
    dados = models.TextField()

    def __str__(self):
        return f'{self.pk}'


class Documento(BaseIntegracao):
    """
    Model for document entity
    """
    ENTRADA = 'ENTRADA'
    SAIDAS = 'SAIDAS'
    JURIDICOS = 'JURIDICOS'

    TIPOS = (
        (ENTRADA, 'Entradas'),
        (SAIDAS, 'Saidas'),
        (JURIDICOS, 'Jurídicos'),
    )

    id = models.IntegerField(primary_key=True)
    data_reg = models.DateField()
    documento = models.CharField(max_length=100)
    empresa = models.CharField(max_length=100)
    caixa = models.IntegerField()
    ano = models.IntegerField()
    prateleira = models.CharField(max_length=10)
    sessao = models.CharField(max_length=10)
    tipo = models.CharField(max_length=20, choices=TIPOS, default=ENTRADA)
    observacao = models.TextField(null=True, blank=True)
    anexo = models.FileField(upload_to='anexos/', null=True, blank=True)
    anexo_img = models.ImageField(upload_to='imagens/', null=True, blank=True)
    dt_compet = models.DateField(null=True, blank=True)
    ta_retirado = models.BooleanField(default=False, null=True)
    ta_devolvido = models.BooleanField(default=False, null=True)
    status_cx = models.CharField(max_length=20, null=True, blank=True)

    def __str__(self):
        return f'{self.pk}'
