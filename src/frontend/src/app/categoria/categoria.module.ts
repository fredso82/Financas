import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CategoriaRoutingModule } from './categoria-routing.module';
import { CategoriaService } from './categoria.service';
import { ListaComponent } from './lista/lista.component';
import { NovaCategoriaComponent } from './novo/novo.component';
import { AlteracaoCategoriaComponent } from './alteracao/alteracao.component';
import { MessageService } from 'primeng/api';

@NgModule({
    imports: [
        SharedModule,
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
