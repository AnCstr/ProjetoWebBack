import { Component, inject } from '@angular/core';
import { ProductsStateService } from '../../data-access/product-state.service';
import { ProductCardComponent } from '../../ui/product-card/product-card.component';
import { CartStateService } from '../../../shared/data-access/cart-state.service';
import { Product } from '../../../shared/interfaces/product.interface';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from '../../data-access/products.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  providers: [ProductsStateService],
})

export default class ProductListComponent {
  productsState = inject(ProductsStateService);
  cartState = inject(CartStateService).state;
  productsService = inject(ProductsService)
  filtersLoaded: Promise<boolean> = Promise.resolve(false);
  produtos: Product[] = [];
  page = 1;
  retriveProdutos = this.getProdutos();
  router = inject(Router)

  constructor(
    private formBuilder: FormBuilder,
  ) {
  }

  searchForm = this.formBuilder.group({
    valor: ''
  });

  atualizarDados(){
    const filter = this.searchForm.value.valor;
    
    if (filter === null || filter === undefined || filter === ''){
      this.getProdutos()
    } else {
      const httpGet = this.productsService.getProductByTitle(filter)
      httpGet.subscribe(
        (response) => {
          this.produtos = response;
          this.filtersLoaded = Promise.resolve(true);
          
        },
        (error) => {
          console.error('Erro ao finalizar pedido', error)
        }
      );
    }
  }

  getProdutos() {
    this.productsService.getProducts(this.page).subscribe(
      (response) => {
        this.produtos = response;
        this.filtersLoaded = Promise.resolve(true);
          },
          (error) => {
            console.error('Erro ao finalizar pedido', error);
          }
        );
  }
        

  changePage(){
    this.page += 1;
    this.getProdutos();
  }

  returnPage(){
    this.page -= 1;
    this.getProdutos();
  }

  addToCart(product: Product){
    this.cartState.add({
      product,
      quantity: 1,
    });
  }
}



