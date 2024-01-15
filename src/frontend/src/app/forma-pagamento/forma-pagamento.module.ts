import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';


import { FormaPagamentoRoutingModule } from './forma-pagamento-routing.module';
import { FormaPagamentoService } from './forma-pagamento.service';
import { ListaComponent } from './lista/lista.component';
import { NovaFormaPagamentoComponent } from './novo/novo.component';
import { AlteracaoFormaPagamentoComponent } from './alteracao/alteracao.component';


@NgModule({
    imports: [
    FormaPagamentoRoutingModule,
    ListaComponent,
    NovaFormaPagamentoComponent,
    AlteracaoFormaPagamentoComponent
],
    exports: [NovaFormaPagamentoComponent],
    providers: [
        FormaPagamentoService,
        MessageService
    ]
})
export class FormaPagamentoModule { }
