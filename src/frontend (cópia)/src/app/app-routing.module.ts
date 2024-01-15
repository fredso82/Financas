import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'lancamentos', pathMatch: 'full'},
  {
    path: 'lancamentos',
    loadChildren: () => import('./lancamento/lancamento.module').then(m => m.LancamentoModule)
  },
  {
    path: 'categorias',
    loadChildren: () => import('./categoria/categoria.module').then(m => m.CategoriaModule)
  },
  {
    path: 'formas-de-pagamento',
    loadChildren: () => import('./forma-pagamento/forma-pagamento.module').then(m => m.FormaPagamentoModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
