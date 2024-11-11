import { Component, inject } from '@angular/core';
import { BaseHttpService } from '../../shared/data-access/base-http.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DadosPedidoService } from './dados-pedido.service';


@Component({
  selector: 'app-dados-pedido',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./dados-pedido.component.html",
  styleUrl: './dados-pedido.component.scss'
})

export default class DadosPedidoComponent {
  router = inject(Router);
  baseHttp = new BaseHttpService();
  dadosPedidoService = inject(DadosPedidoService)

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  checkoutForm = this.formBuilder.group({
    num_pedido: '',
    nome: '',
    sobrenome: '',
    rua: '',
    cidade: '',
    estado: '',
    cep: ''
  });

  atualizarDados() {
    this.dadosPedidoService.returnPost(this.checkoutForm.value)
    this.router.navigate(['/']);
    alert("Pedido " + this.checkoutForm.value.num_pedido + " Atualizado Com Sucesso!");
  }

  voltarPagina(){
    this.router.navigate(['/']);
  }
}
