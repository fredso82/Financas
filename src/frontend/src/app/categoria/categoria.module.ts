import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';

import { CategoriaRoutingModule } from './categoria-routing.module';
import { CategoriaService } from './categoria.service';
import { ListaComponent } from './lista/lista.component';

@NgModule({
  declarations: [
    ListaComponent
  ],
  imports: [
    CommonModule,
    CategoriaRoutingModule,
    TableModule,
    ToolbarModule,
    ButtonModule
  ],
  providers: [
    CategoriaService
  ]
})
export class CategoriaModule { }
