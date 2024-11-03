import { Component, inject, input } from '@angular/core';
import { CartItemComponent } from '../cart/ui/cart-item/cart-item.component';
import { CartStateService } from '../shared/data-access/cart-state.service';
import { ProductItemCart } from '../shared/interfaces/product.interface';
import { CurrencyPipe } from '@angular/common';
import { ProdutoItemComponent } from './ui/pedido-item/pedido-item.component';


@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [ProdutoItemComponent, CurrencyPipe],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.scss'
})

export default class CartComponent {
  state = inject(CartStateService).state;
  productCartItem = input.required<ProductItemCart>();
}
