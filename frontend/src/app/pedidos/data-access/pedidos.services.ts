import { BaseHttpService } from "../../shared/data-access/base-http.service";
import { intefacePedido } from "../../shared/interfaces/product.interface";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

interface numPedido {
  num_pedido: number;
}

@Injectable({
  providedIn: 'root'
})

export class Pedido{
  baseHttp = new BaseHttpService();
  products: any
  total: any

  getPedido() {
    this.fetch().subscribe(
    (response) => {
      const httpGetPedido = this.baseHttp.http.get(`${ this.baseHttp.apiUrl }/pedido/${response['num_pedido']}`) as Observable<intefacePedido>
      
      httpGetPedido.subscribe(
        (response) => {
          this.products = response['products'];
          this.total = response['total'];
          
        },
        (error) => {
          console.error('Erro ao finalizar pedido', error);
        }
      );
      
    },
    (error) => {
      console.error('Erro ao finalizar pedido', error);
    }
  );
  console.log(this.products);
}

  fetch() {
    const baseHttp = new BaseHttpService();
    
    return baseHttp.http.get(`${ baseHttp.apiUrl }/num_ult_pedido`) as Observable<numPedido>
  }
}
