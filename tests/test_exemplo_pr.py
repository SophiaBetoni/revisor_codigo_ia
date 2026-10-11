import unittest

from controllers.exemplo_pr import calcular_total


class TestCalcularTotal(unittest.TestCase):
    def test_calcula_total_do_pedido(self):
        resultado = calcular_total(10, 3)
        self.assertEqual(resultado, 30)

    def test_quantidade_zero(self):
        resultado = calcular_total(10, 0)
        self.assertEqual(resultado, 0)


if __name__ == "__main__":
    unittest.main()
