from decouple import config
from django.db import IntegrityError
from django.utils import timezone

from docsapp.firebird import FirebirdConnector
from docsapp.integracao.errors import IntegrationLoadDataError, IntegrationParseDataError
from docsapp.integracao.models import Documento, BaseIntegracao, LogErro


class DocumentIntegration:

    def __init__(self):
        self.database = FirebirdConnector()
        self.bulk_list = []

    def _load_data(self, tabela):
        try:
            self.data = self.database.select_all(tabela)
        except Exception as e:
            raise IntegrationLoadDataError(e)

    def _parse_data(self, entity, data):
        try:
            FROM_TO_ENTITY = dict()
            FROM_TO_ENTITY['documento'] = Documento
    
            data['integracao_status'] = BaseIntegracao.INTEGRADA
            data['integracao_finalizada'] = timezone.now()
    
            if entity == 'documento':
                if data['tipo'] is None:
                    data['tipo'] = Documento.ENTRADA
    
            doc = FROM_TO_ENTITY[entity].objects.filter(id=data['id'])
    
            if doc.exists():
                self.bulk_list.append(Documento(**data))
            else:
                Documento.objects.filter(id=data['id']).update(**data)
        except Exception as e:
            raise IntegrationParseDataError(e)

    def integrate(self):
        try:
            self._load_data('documento')

            for data in self.data:
                self._parse_data('documento', data)

            if len(self.bulk_list) > 0:
                Documento.objects.bulk_create(self.bulk_list)

        except Exception as e:
            LogErro(
                classe=e.__class__.__name__,
                log=e,
                dados=str(self.data)
            ).save()
