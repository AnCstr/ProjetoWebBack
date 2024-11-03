from app.comum.strings import Diretorios
import base64


def get_img_data(nome_img: str) -> str:
    arq_img = None

    with open(f"{Diretorios.IMGS}\{nome_img}.jpg", "rb") as file:
        arq_img = file.read()

    return arq_img  # base64.encodebytes(arq_img).decode('utf-8')
