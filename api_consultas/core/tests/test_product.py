from django.test import TestCase

from core.models import Group, Product


class TestProduct(TestCase):

    def test_product_name(self):
        group, _ = (
            Group.
                objects.
                get_or_create(description='Ferramentas')
        )

        product = Product()
        product.description = 'Alicate de Pressão'
        product.group = group
        product.price = 10
        product.status = Product.ACTIVE
        product.save()

        self.assertEqual(product.description,
                         str(product))
