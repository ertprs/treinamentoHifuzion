from django.contrib import admin
from .models import Documento, LogErro


@admin.register(Documento)
class DocumentoAdmin(admin.ModelAdmin):
    list_display = [
        'documento',
        'empresa',
        'status_cx',
        'integracao_status',
        'integracao_inicio',
        'integracao_finalizada',
        'integracao_log'
    ]

@admin.register(LogErro)
class LogErroAdmin(admin.ModelAdmin):
    list_display = [
        'classe',
        'data'
    ]
