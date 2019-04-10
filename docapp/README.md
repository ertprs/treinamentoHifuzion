# Aplicação de controle de Documentos

Essa aplicação tem por objetivo controlar documentos na web por cliente e endereço parecido com um sistema de almoxarifado.

## Divisão

* api: Controle da aplicação de backend, será feita em python com django.
* web: Controle da aplicação no frontend, será feita com javascritp com VueJS.
* doc: Documentação da aplicação

## Requisitos

| Tecnologia | Versão |
|---|---|
| Python | 3.7.3 |
| NodeJS | 11 |
| Yarn | 1.15.2 |
| Django | 2.1 |
| VueCli | 3.5.3 |

>OBS: Para controlar os pacotes do python, iremos utilizar o pipenv

### Python

Pacotes de produção

```bash
pipenv install django python-decouple dj-database-url django-cors-headers django-extensions django-filter django-rest-auth djangorestframework
```

Pacotes de Desenvolvimento

```bash
pipenv install -d sqlformatter notebook
```



