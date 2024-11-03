import { Component, input, output } from '@angular/core';
import { ProductItemCart } from '../../../shared/interfaces/product.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-pedido-item',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './pedido-item.component.html',
  styleUrl: './pedido-item.component.scss'
})

export class ProdutoItemComponent {
  productCartItem = input.required<ProductItemCart>();
}