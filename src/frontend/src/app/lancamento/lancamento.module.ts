import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LancamentoRoutingModule } from './lancamento-routing.module';
import { ListaComponent } from './lista/lista.component';
import { SharedModule } from '../shared/shared.module';
import { NovoLancamentoComponent } from './novo/novo.component';
import { FormaPagamentoService } from '../forma-pagamento/forma-pagamento.service';
import { MessageService } from 'primeng/api';
import { CategoriaService } from '../categoria/categoria.service';
import { ListaMesComponent } from './lista-mes/lista-mes.component';
import { CategoriaModule } from '../categoria/categoria.module';
import { FormaPagamentoModule } from '../forma-pagamento/forma-pagamento.module';
import { AlterarLancamentoComponent } from './alterar/alterar.component';


@NgModule({
    declarations: [
        ListaComponent,
        NovoLancamentoComponent,
        ListaMesComponent,
        AlterarLancamentoComponent
    ],
    imports: [
        CommonModule,
        LancamentoRoutingModule,
        SharedModule,
        CategoriaModule,
        FormaPagamentoModule
    ],
    providers: [
        FormaPagamentoService,
        CategoriaService,
        MessageService
    ]
})
export class LancamentoModule { }
