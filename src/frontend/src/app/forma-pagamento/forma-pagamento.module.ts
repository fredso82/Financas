import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormaPagamentoRoutingModule } from './forma-pagamento-routing.module';
import { ListaComponent } from './lista/lista.component';


@NgModule({
  declarations: [
    ListaComponent
  ],
  imports: [
    CommonModule,
    FormaPagamentoRoutingModule
  ]
})
export class FormaPagamentoModule { }
