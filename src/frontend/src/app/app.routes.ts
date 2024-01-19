import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

export const APP_ROUTES: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: 'lancamentos',
                loadChildren: () => import('./lancamento/lancamento.routes').then(m => m.LANCAMENTO_ROUTES)
            },
            {
                path: 'categorias',
                loadChildren: () => import('./categoria/categoria.routes').then(m => m.CATEGORIA_ROUTES)
            },
            {
                path: 'formas-de-pagamento',
                loadChildren: () => import('./forma-pagamento/forma-pagamento.routes').then(m => m.FORMAPAGAMENTO_ROUTES)
            }
        ]
    },
    {
        path: 'login', component: LoginComponent
    }

];