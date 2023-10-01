import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';

import { SharedModule } from '../shared/shared.module';
import { FormaPagamentoRoutingModule } from './forma-pagamento-routing.module';
import { FormaPagamentoService } from './forma-pagamento.service';
import { ListaComponent } from './lista/lista.component';


@NgModule({
  declarations: [
    ListaComponent
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
