import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { NovoLancamentoComponent } from './novo/novo.component';

const routes: Routes = [
  { path: '', component: ListaComponent},
  { path: 'novo', component: NovoLancamentoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LancamentoRoutingModule { }
