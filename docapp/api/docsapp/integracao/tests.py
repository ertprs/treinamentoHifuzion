from django.test import TestCase
from .services import DocumentoIntegracao
from .models import Documento


class TestDocumentoIntegracao(TestCase):

    def setUp(self) -> None:
        self.integracao = DocumentoIntegracao()
        self.integracao.integrar()

    def testDocumentoIntegrated(self):
        for data in self.integracao.data:
            doc = Documento.objects.filter(id=data['id']).first()
            self.assertIsInstance(doc, Documento)
