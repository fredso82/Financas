import { Routes } from "@angular/router";
import { ListaComponent } from "./lista/lista.component";
import { NovaCategoriaComponent } from "./novo/novo.component";

export const CATEGORIA_ROUTES: Routes = [
    { path: '', component: ListaComponent },
    { path: 'novo', component: NovaCategoriaComponent }
];