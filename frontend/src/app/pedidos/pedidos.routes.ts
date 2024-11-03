import { Routes } from "@angular/router";


export default[
    {
        path: '',
        loadComponent: () => import('../pedidos/pedidos.component'),
    }
] as Routes;