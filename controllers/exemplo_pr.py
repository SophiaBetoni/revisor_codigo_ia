import sqlite3


def calcular_total(preco, quantidade):
    return preco * quantidade


def processar_pedido(expressao):
    senha = "senha_ficticia_123"

    try:
        resultado = eval(expressao)
        print("Pedido processado")
        return resultado
    except:
        print("Erro ao processar pedido")
        return None
