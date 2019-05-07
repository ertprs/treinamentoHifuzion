from celery.task import task
from django.template.loader import render_to_string
from django.utils import timezone

from core.emails import DefaultEmail
from crm.models import Client


@task(name="birthday_client")
def birthday_client():
    today = timezone.now().date()
    for c in Client.objects.filter(birthday__month=today.month, birthday__day=today.day):
        ctx = {'data': {
            'nome': c.name,
            'company': 'Evil Corp'
        }}
        mail = DefaultEmail(assunto='Aewww Feliz aniversário',
                            conteudo=render_to_string('birthday.html', ctx),
                            para=c.email)
        mail.send()
