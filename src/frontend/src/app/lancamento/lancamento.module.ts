import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LancamentoRoutingModule } from './lancamento-routing.module';
import { ListaComponent } from './lista/lista.component';
import { SharedModule } from '../shared/shared.module';
import { NovoLancamentoComponent } from './novo/novo.component';
import { FormaPagamentoService } from '../forma-pagamento/forma-pagamento.service';
import { MessageService } from 'primeng/api';
import { CategoriaService } from '../categoria/categoria.service';


@NgModule({
    declarations: [
        ListaComponent,
        NovoLancamentoComponent
    ],
    imports: [
        CommonModule,
        LancamentoRoutingModule,
        SharedModule
    ],
    providers: [
        FormaPagamentoService,
        CategoriaService,
        MessageService
    ]
})
export class LancamentoModule { }
