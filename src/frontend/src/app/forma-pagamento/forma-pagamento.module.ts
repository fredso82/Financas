import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';

import { SharedModule } from '../shared/shared.module';
import { FormaPagamentoRoutingModule } from './forma-pagamento-routing.module';
import { FormaPagamentoService } from './forma-pagamento.service';
import { ListaComponent } from './lista/lista.component';
import { NovaFormaPagamentoComponent } from './novo/novo.component';
import { AlteracaoFormaPagamentoComponent } from './alteracao/alteracao.component';


@NgModule({
  declarations: [
    ListaComponent,
    NovaFormaPagamentoComponent,
    AlteracaoFormaPagamentoComponent
  ],
  imports: [
    SharedModule,
    FormaPagamentoRoutingModule
  ],
  providers: [
    FormaPagamentoService,
    MessageService
  ]
})
export class FormaPagamentoModule { }
