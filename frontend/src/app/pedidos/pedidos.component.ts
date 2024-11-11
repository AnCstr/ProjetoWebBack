import { Component, inject, input } from '@angular/core';
import { CartItemComponent } from '../cart/ui/cart-item/cart-item.component';
import { CartStateService } from '../shared/data-access/cart-state.service';
import { ProductItemCart } from '../shared/interfaces/product.interface';
import { CurrencyPipe } from '@angular/common';
import { ProdutoItemComponent } from './ui/pedido-item/pedido-item.component';
import { BaseHttpService } from "./../shared/data-access/base-http.service";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { intefacePedido, Product } from '../shared/interfaces/product.interface';
import { CommonModule } from '@angular/common';

interface numPedido {
  num_pedido: number;
}

interface produtoPedido {
    product: Product; 
    quantity: number;
}

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [ProdutoItemComponent, CurrencyPipe, CommonModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.scss'
})

export default class CartComponent {
  retriveNumUltPedido = this.getNumUltPedido();
  numPedido = 0;
  retrivePedido = this.getPedido();
  produtos: produtoPedido[] = [];
  total: number = 0;
  filtersLoaded: Promise<boolean> = Promise.resolve(false);
  numPedidoLoaded: Promise<boolean> = Promise.resolve(false);
  state = inject(CartStateService).state;
  productCartItem = input.required<ProductItemCart>();

  router = inject(Router);
  baseHttp = new BaseHttpService();

  getNumUltPedido() {
    this.fetch().subscribe(
        (response) => {
          this.numPedido = response['num_pedido'];
          this.numPedidoLoaded = Promise.resolve(true);
          
        },
        (error) => {
          console.error('Erro ao finalizar pedido', error);
        }
      );
  }
  fetch() {
    const baseHttp = new BaseHttpService();
    
    return baseHttp.http.get(`${ baseHttp.apiUrl }/num_ult_pedido`) as Observable<numPedido>
  }

  getPedido() {
    this.fetch().subscribe(
      (response) => {
        const pedido = this.baseHttp.http.get(`${ this.baseHttp.apiUrl }/pedido/${response['num_pedido']}`) as Observable<intefacePedido>
        
        pedido.subscribe(
          (response) => {
            this.produtos = response.products;
            this.total = response.total;

            this.filtersLoaded = Promise.resolve(true);
            
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
  }

  cancelPedido() {
    this.baseHttp.http.get(`${ this.baseHttp.apiUrl }/delete_pedido/${this.numPedido}`).subscribe(
      (response) => {
        console.log(response);
        
      },
      (error) => {
        console.error('Erro ao finalizar pedido', error);
      }
    )
    this.router.navigate(['/']);
    alert("Pedido " + this.numPedido + " Cancelado!");
    
    this.state.products().map(
      (product) => this.state.remove(product.product.id)
      )
  }

  atualizarPedido(){
    this.router.navigate(['/dadosPedido']);
  }
}
