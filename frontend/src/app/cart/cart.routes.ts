import { Routes } from "@angular/router";


export default[
    {
        path: '',
        loadComponent: () => import('../cart/cart.component'),
    }
] as Routes;