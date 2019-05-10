import random

import requests

URL = 'http://localhost:8000/api/'


def populate_group():
    groups = ['Combustiveis', 'Ferramentas', 'Insumos', 'Material de Escritório']

    for group in groups:
        response = requests.post(f'{URL}groups/', dict(description=group))

        if response.status_code != 201:
            print(f'Deu erro ao cadastrar o grupo {group}.\n Erro: {response.content}')


def populate_product():
    groups = [1, 2, 3, 4]
    for group in groups:
        for i in range(4):
            product = dict(description=f'Produto {i}',
                           group=group,
                           price=random.randrange(100, 500),
                           status=1)
            response = requests.post(f'{URL}products/', product)
            if response.status_code != 201:
                print(f'Deu erro ao cadastrar o produto {i}.\n Erro: {response.content}')


if __name__ == '__main__':
    populate_group()
    populate_product()
