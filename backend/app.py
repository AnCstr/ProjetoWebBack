import json
from flask import Flask, send_file, request
from app.models import Produtos, Produto
import os
from pathlib import Path


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

if __name__ == "__main__":
    Produtos().restaurar_backup()
    app.run(host='0.0.0.0', debug=True)
