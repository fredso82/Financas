import { Routes } from '@angular/router';

import { AlterarLancamentoComponent } from './alterar/alterar.component';
import { LancamentoResolver } from './lancamento.resolver';
import { ListaComponent } from './lista/lista.component';
import { NovoLancamentoComponent } from './novo/novo.component';

export const LANCAMENTO_ROUTES: Routes = [
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
