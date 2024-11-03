import pymongo
from typing import Final, List, Dict
from app.comum.strings import DadosDatabase
from bson.json_util import dumps, loads
from bson.objectid import ObjectId
from bson import ObjectId
import os
import bson
from pymongo.errors import BulkWriteError


class Model:
    def __init__(self) -> None:
        self.__client = pymongo.MongoClient("mongodb://project-mongo-1:27017/")  # Prod
        self.__db = self.__client[DadosDatabase.ROOT_DB]

    @property
    def client(self):
        return self.__client
    
    @property
    def db(self):
        return self.__db
    

class Produtos(Model):
    def __init__(self) -> None:
        super().__init__()
        self.__coll = self.db[DadosDatabase.COLLECTION_PRODUTOS]

    @property
    def coll(self):
        return self.__coll

    def coll_existe(self) -> bool:
        if DadosDatabase.COLLECTION_PRODUTOS in self.db.list_collection_names():
            return True
        else:
            return False
        
    def restaurar_backup(self):
        with open(f'{os.path.dirname(os.path.abspath(__file__))}/produtos.bson', 'rb+') as f:
            try:
                self.db['produtos'].insert_many(bson.decode_all(f.read()))
            except BulkWriteError:
                pass

    
    def em_estoque(self) -> Dict[str, str]:
        if not self.coll_existe():
            return dumps({})

    def registrados(self, query_limit) -> Dict[str, str]:
        if not self.coll_existe():
            return dumps({})
        
        return dumps(self.__coll.find().limit(query_limit))
    
class Produto:
    def __init__(self) -> None:
        self.__produtos = Produtos()

    @property
    def id_produto(self):
        return self.__id_produto
    
    def get_by_nome(self, nome: str) -> Dict[str, dict]:
        """
        Retorna dados de produto a partir do nome do mesmo
        :param nome: str nome de produto a ser pesquisado
        :return Dict[str, str]: Json com dados de produto
        """
        jsn_produto = self.__produtos.coll.find_one({"nome": nome})
        
        if len(jsn_produto) <= 0:
            raise ValueError("Produto não localizado")

        return dumps(jsn_produto)
    
    def get_by_id(self, id_produto: str) -> Dict[str, dict]:
        """
        Retorna dados de produto a partir do ObjectId do mesmo
        :param id_produto: str id de produto a ser pesquisado
        :return Dict[str, str]: Json com dados de produto
        """
        jsn_produto = self.__produtos.coll.find_one({"_id": ObjectId(id_produto)})
        
        if len(jsn_produto) <= 0:
            raise ValueError("Produto não localizado")

        return dumps(jsn_produto)
