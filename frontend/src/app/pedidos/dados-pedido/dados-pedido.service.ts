import { Injectable } from "@angular/core";
import { BaseHttpService } from "../../shared/data-access/base-http.service";
import { interfaceDadosEnvio } from "../../shared/interfaces/product.interface";

@Injectable({
    providedIn: 'root'
})

export class DadosPedidoService extends BaseHttpService {

    returnPost(dadosEnvio: object) {
        return this.http.post<interfaceDadosEnvio>(`${ this.apiUrl }/atualizar_dados_pedido`, dadosEnvio).subscribe(
            (response) => {
      
              console.log('Pedido finalizado com sucesso', response);
              
            },
            (error) => {
              console.error('Erro ao finalizar pedido', error);
            }
          );
      }
}