import { Component, inject } from '@angular/core';
import { CartItemComponent } from './ui/cart-item/cart-item.component';
import { CartStateService } from '../shared/data-access/cart-state.service';
import { ProductItemCart } from '../shared/interfaces/product.interface';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from './data-access/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemComponent, CurrencyPipe],
  templateUrl: './cart.component.html',
  styles: ``,
})

export default class CartComponent {
  state = inject(CartStateService).state;
  router = inject(Router);
  cartService = inject(CartService);

  onRemove(id: number) {
    this.state.remove(id);
  }

  onIncrease(product: ProductItemCart) {
    this.state.udpate({
      product: product.product,
      quantity: product.quantity + 1,
    });
  }

  onDecrease(product: ProductItemCart) {
    if (product.quantity > 0) {
      this.state.udpate({
        ...product,
        quantity: product.quantity - 1,
      });
      if ((product.quantity - 1) === 0) {
        this.onRemove(product.product.id);
      }
    }
  }

  finalizarPedido() {
    
    const produtosCarrinho = this.state.products();

    this.cartService.returnPost(produtosCarrinho).subscribe(
      (response) => {

        console.log('Pedido finalizado com sucesso', response);

        this.router.navigate(['/pedidos']);
      },
      (error) => {
        console.error('Erro ao finalizar pedido', error);
      }
    );
  }
}
