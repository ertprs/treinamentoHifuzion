from django.test import TestCase

from .models import Documento
from .services import DocumentIntegration


class TestDocumentoIntegracao(TestCase):

    def setUp(self) -> None:
        self.integracao = DocumentIntegration()
        self.integracao.integrate()

    def testDocumentoHasData(self):
        """
        Should be test with data has rows
        :return:
        """
        self.assertGreater(len(self.integracao.data), 0)

    def _get_fields_from_model(self, model, exclude=' '):
        return [str(field).split('.')[2] for field in Documento._meta.get_fields() if
                not exclude in str(field).split('.')[2]]

    def testeDocumentoFields(self):
        """
        Should be test with fields are correct
        :return:
        """
        data = self.integracao.data[0]
        fields = self._get_fields_from_model(Documento, 'integracao_')
        for field in fields:
            self.assertIn(field, data)

    def testDocumentoIntegrated(self):
        """
        Should be test has integrations has work
        :return:
        """
        for data in self.integracao.data:
            doc = Documento.objects.filter(id=data['id']).first()
            self.assertIsInstance(doc, Documento)
