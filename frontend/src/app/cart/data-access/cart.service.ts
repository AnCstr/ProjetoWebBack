import { Injectable } from "@angular/core";
import { BaseHttpService } from "../../shared/data-access/base-http.service";
import { HttpHeaders } from "@angular/common/http";
import { ProductItemCart } from "../../shared/interfaces/product.interface";

@Injectable({
    providedIn: 'root'
})

export class CartService extends BaseHttpService {

    returnPost(produtos: ProductItemCart[]) {
        return this.http.post('/api/pedido/finalizar', { produtos });
      }

}