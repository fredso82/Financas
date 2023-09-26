import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaRoutingModule } from './categoria-routing.module';
import { ListaComponent } from './lista/lista.component';
import { CategoriaService } from './categoria.service';


@NgModule({
  declarations: [
    ListaComponent
  ],
  imports: [
    CommonModule,
    CategoriaRoutingModule
  ],
  providers: [
    CategoriaService
  ]
})
export class CategoriaModule { }
