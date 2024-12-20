import { Injectable } from "@angular/core";
import { BaseHttpService } from "../../shared/data-access/base-http.service";
import { HttpHeaders } from "@angular/common/http";
import { intefacePedido } from "../../shared/interfaces/product.interface";

@Injectable({
    providedIn: 'root'
})

export class CartService extends BaseHttpService {

    returnPost(pedido: object) {
        return this.http.post<intefacePedido>(`${ this.apiUrl }/api/pedido/finalizar`, pedido).subscribe(
            (response) => {
      
              console.log('Pedido finalizado com sucesso', response);
              
            },
            (error) => {
              console.error('Erro ao finalizar pedido', error);
            }
          );
      }
}