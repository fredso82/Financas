import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';

import { AlteracaoCategoriaComponent } from './alteracao/alteracao.component';
import { CategoriaRoutingModule } from './categoria-routing.module';
import { CategoriaService } from './categoria.service';
import { ListaComponent } from './lista/lista.component';
import { NovaCategoriaComponent } from './novo/novo.component';


@NgModule({
    imports: [
    CategoriaRoutingModule,
    ListaComponent,
    NovaCategoriaComponent,
    AlteracaoCategoriaComponent
],
    exports: [NovaCategoriaComponent],
    providers: [
        CategoriaService,
        MessageService
    ]
})
export class CategoriaModule { }
