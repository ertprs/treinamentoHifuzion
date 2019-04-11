from django.http import HttpResponse
from django.shortcuts import render

from docsapp.integracao.services import DocumentoIntegracao


def qualquer(request):
    integ = DocumentoIntegracao()
    integ.integrar()
    return HttpResponse('Executou', status=200)
