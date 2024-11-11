import { Routes } from "@angular/router";


export default[
    {
        path: '',
        loadComponent: () => import("./dados-pedido.component"),
    }
] as Routes;
