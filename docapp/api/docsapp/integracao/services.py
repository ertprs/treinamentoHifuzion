from decouple import config
from django.db import IntegrityError
from django.utils import timezone

from docsapp.firebird import FirebirdConnector
from docsapp.integracao.models import Documento, BaseIntegracao, LogErro


class DocumentoIntegracao:
    fb_host = config('FB_HOST')
    fb_database = config('FB_DATABASE')
    fb_user = config('FB_USER')
    fb_password = config('FB_PASSWORD')

    def __init__(self):
        self.db = FirebirdConnector(self.fb_host, self.fb_database, self.fb_user, self.fb_password)
        self.lista = []

    def _load_data(self, tabela):
        self.data = self.db.select_all(tabela)

    def _validate_and_check_exist(self, tabela, data):
        DE_PARA_TABELA = dict()
        DE_PARA_TABELA['documento'] = Documento

        data['integracao_status'] = BaseIntegracao.INTEGRADA
        data['integracao_finalizada'] = timezone.now()

        if tabela == 'documento':
            if data['tipo'] is None:
                data['tipo'] = Documento.ENTRADA

        doc = DE_PARA_TABELA[tabela].objects.filter(id=data['id'])

        if doc.exists():
            return True, data
        return False, data

    def _insert_or_update(self, existe, data):
        if not existe:
            self.lista.append(Documento(**data))
        else:
            Documento.objects.filter(id=data['id']).update(**data)

    def integrar(self):
        try:
            self._load_data('documento')

            for data in self.data:
                existe, data = self._validate_and_check_exist('documento', data)
                self._insert_or_update(existe, data)

            if len(self.lista) > 0:
                Documento.objects.bulk_create(self.lista)

        except Exception as e:
            LogErro(
                classe=e.__class__.__name__,
                log=e,
                dados=str(self.data)
            ).save()
