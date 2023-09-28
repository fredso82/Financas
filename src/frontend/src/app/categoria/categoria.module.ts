import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CategoriaRoutingModule } from './categoria-routing.module';
import { CategoriaService } from './categoria.service';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';

@NgModule({
  declarations: [
    ListaComponent,
    NovoComponent
  ],
  imports: [
    SharedModule,
    CategoriaRoutingModule    
  ],
  providers: [
    CategoriaService
  ]
})
export class CategoriaModule { }
