import pymongo
from typing import Final, List, Dict
from app.comum.strings import DadosDatabase
from bson.json_util import dumps, loads
from bson.objectid import ObjectId
from bson import ObjectId
import os
import bson
from pymongo.errors import BulkWriteError
from traceback import format_exc



class Model:
    def __init__(self) -> None:
        self.__client = pymongo.MongoClient("mongodb://project-mongo-1:27017/")  # Prod
        #  self.__client = pymongo.MongoClient("mongodb://localhost:27017/")  # Testes
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
        
        return dumps(self.__coll.find({},{'_id': False}).limit(query_limit))

    def get_by_regex_title(self, title: str) -> Dict[str, dict]:
        """
        Retorna dados de produto a partir do titulo do mesmo
        :param title: str title de produto a ser pesquisado
        :return Dict[str, str]: Json com dados de produto
        """
        title = title.title()
        jsn_produto = self.__coll.find({"title": {'$regex': title, '$options':'i'}})
        print(jsn_produto)

        return dumps(jsn_produto)
    
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


class Pedido(Model):
    def __init__(self) -> None:
        super().__init__()
        self.__coll = self.db[DadosDatabase.COLLECTION_PEDIDOS]

    def criar_pedido(self, jsn_pedido):
        """
        Cria registro de pedido em banco de dados
        :param jsn_pedido: Json com dados de pedido
        """
        try:
            ult_pedido = self.get_ult_num_pedido()

            if ult_pedido is None:
                jsn_pedido['num_pedido'] = 1
            else:
                jsn_pedido['num_pedido'] = ult_pedido + 1
     
            self.__coll.insert_one(jsn_pedido)
        except Exception:
            print(format_exc())

    def get_ult_num_pedido(self):
        """
        Retorna ultimo valor de pedido
        """
        try:
            ult_pedido = self.__coll.find_one({}, sort={'num_pedido': -1})['num_pedido']
        except KeyError:
            ult_pedido = None
        except TypeError:
            ult_pedido = None

        print(ult_pedido)

        return ult_pedido
    
    def delete_pedido(self, num_pedido):
        """
        Deleta pedido a partir do numero do pedido
        """
        query = {"num_pedido": int(num_pedido)}
        self.__coll.delete_many(query)
        
    def get_by_num_pedido(self, num_pedido):
        """
        Retorna dados de pedido a partir no numero de pedido informado
        """
        query = {"num_pedido": int(num_pedido)}
        jsn_pedido = self.__coll.find_one(query)

        return dumps(jsn_pedido)
    
    def atualiza_dados(self, json_dados):
        """
        Atualiza dados de pedido a partir de dados informados
        """
        query = {"num_pedido": int(json_dados["num_pedido"])}
        json_dados.pop("num_pedido", None)

        novos_valores = {"$set": {"dados_envio": json_dados}}
        
        self.__coll.update_one(query, novos_valores)

