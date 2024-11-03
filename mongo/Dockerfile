FROM mongo:5.0

WORKDIR /mongo
COPY backup/produtos.bson .

CMD ["mongorestore", "--db", "appdb", "/backup/produtos.bson"]