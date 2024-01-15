import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Categoria } from '../models/categoria';
import { CategoriaService } from '../categoria.service';

@Component({
    selector: 'app-categoria-novo',
    templateUrl: './novo.component.html'
})
export class NovaCategoriaComponent implements OnInit {
    @Output() onSave = new EventEmitter<{ sucesso: boolean, dados: any }>();

    categoria: Categoria;
    submitted = false;

    constructor(private categoriaService: CategoriaService) {
        this.categoria = { id: "", nome: "" };
    }
    ngOnInit(): void {

    }

    gravar() {
        this.submitted = true;
        if (!this.categoria.nome.trim())
            return;

        this.categoriaService.incluir(this.categoria).subscribe({
            next: (e) => {
                this.onSave.emit({ sucesso: true, dados: this.categoria });
            },
            error: (e) => {
                this.onSave.emit({ sucesso: false, dados: e});
            }
        });
    }

}
