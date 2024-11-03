FROM mongo:5.0

WORKDIR /mongo
COPY produtos.bson .

CMD ["mongorestore", "--db", "appdb", "produtos.bson"]