import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'lancamentos', pathMatch: 'full'},
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
  
  ];