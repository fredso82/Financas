import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { NovoLancamentoComponent } from './novo/novo.component';
import { LancamentoResolver } from './lancamento.resolver';
import { AlterarLancamentoComponent } from './alterar/alterar.component';

const routes: Routes = [
    {
        path: '', 
        component: ListaComponent
    },
    {
        path: 'novo',
        component: NovoLancamentoComponent

    },
    {
        path: 'alterar/:id',
        component: AlterarLancamentoComponent,
        resolve: { lancamento: LancamentoResolver }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LancamentoRoutingModule { }
