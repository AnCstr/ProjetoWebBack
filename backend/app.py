import json
from flask import Flask, send_file, request
from app.models import Produtos, Produto, Pedido
import os
from pathlib import Path
from bson.json_util import dumps


app = Flask(__name__)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    return response

@app.route('/products')
def produtos():
    limit = int(request.args.get('limit'))
    jsn = Produtos().registrados(limit)

    return jsn

@app.route('/products/<id>')
def produto(id):
    jsn = Produto().get_by_id(id)
    return jsn

@app.route('/imgs/<filename>')
def get_image(filename):
    filename = Path(f'{os.path.dirname(__file__)}/app/comum/imgs/{filename}.jpg')
    return send_file(filename, mimetype='image/jpg')

@app.route('/logo.png')
def logo():
    filename = Path(f'{os.path.dirname(__file__)}/app/comum/imgs/logo.png')
    return send_file(filename, mimetype='image/png')

@app.route('/api/pedido/finalizar', methods=["POST"])
def post_pedido():
    json_pedido = request.json
    Pedido().criar_pedido(json_pedido)

    return {}

@app.route('/num_ult_pedido')
def num_ult_pedido():
    num_ult_pedido = Pedido().get_ult_num_pedido()

    return dumps({'num_pedido': num_ult_pedido})

@app.route('/pedido/<num_pedido>')
def pedido(num_pedido):
    dados_pedido = Pedido().get_by_num_pedido(num_pedido)
    print(type(dados_pedido))

    return dados_pedido

@app.route('/delete_pedido/<num_pedido>')
def delete_pedido(num_pedido):
    Pedido().delete_pedido(num_pedido)

    return {}

@app.route("/atualizar_dados_pedido", methods=["POST"])
def atualizar_dados_pedido():
    json_dados = request.json
    Pedido().atualiza_dados(json_dados)

    return {}

if __name__ == "__main__":
    Produtos().restaurar_backup()
    app.run(host='0.0.0.0', debug=True) 
