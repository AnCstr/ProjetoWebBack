export interface Product {
    category: string;
    description: string;
    id: number;
    image: string;
    price: number;
    rating: {rate: number; count: number};
    title: string;
    preco_brl: string;
    _id: string;
}

export interface ProductItemCart {
    product: Product;
    quantity: number;
    
}

export interface intefacePedido extends JSON{
    products: [{product: Product; quantity: number}];
    total: number;
    data_pedido: Date;
    num_pedido: number;
}

export interface interfaceDadosEnvio extends JSON{
    num_pedido: number,
    nome: string,
    sobrenome: string,
    rua: string,
    cidade: string,
    estado: string,
    cep: string
}
