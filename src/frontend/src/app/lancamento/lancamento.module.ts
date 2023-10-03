import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LancamentoRoutingModule } from './lancamento-routing.module';
import { ListaComponent } from './lista/lista.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ListaComponent
  ],
  imports: [
    CommonModule,
    LancamentoRoutingModule,
    SharedModule
  ]
})
export class LancamentoModule { }
