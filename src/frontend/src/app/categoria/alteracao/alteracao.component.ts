import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Categoria } from '../models/categoria';
import { CategoriaService } from '../categoria.service';
import { NgClass } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-catagoria-alteracao',
    templateUrl: './alteracao.component.html',
    standalone: true,
    imports: [FormsModule, InputTextModule, NgClass]
})
export class AlteracaoCategoriaComponent implements OnInit {
    @Output() onSave = new EventEmitter<{ sucesso: boolean, dados: any }>();
    @Input() categoria: Categoria = {id: "", nome: ""}; 
    
    submitted = false;
    
    constructor(private categoriaService: CategoriaService) {     
    }

    ngOnInit(): void {
    }

    gravar() {
        this.submitted = true;
        if (!this.categoria.nome.trim())
            return;

        this.categoriaService.alterar(this.categoria).subscribe({
            next: (e) => {
                this.onSave.emit({ sucesso: true, dados: this.categoria });
            },
            error: (e) => {
                this.onSave.emit({ sucesso: false, dados: e});
            }
        });
    }
}
