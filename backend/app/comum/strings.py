from typing import Final, List
import os


class DadosDatabase:
    ROOT_DB: Final[str] = "appdb"
    COLLECTION_PRODUTOS: Final[str] = "produtos"
    COLLECTION_PEDIDOS: Final[str] = "pedidos"
    COLLECTION_CLIENTES: Final[str] = "clientes"


class Diretorios:
    IMGS: Final[str] = os.path.dirname(os.path.abspath(__file__)) + "\imgs"
