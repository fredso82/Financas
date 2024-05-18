import { NgClass } from '@angular/common';
import { Component, input, OnInit, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

import { CategoriaService } from '../categoria.service';
import { Categoria } from '../models/categoria';

@Component({
    selector: 'app-catagoria-alteracao',
    standalone: true,
    imports: [FormsModule, InputTextModule, NgClass],
    template: `
        <div class="field">
            <label for="nome">Nome <span class="obrigatorio">*</span></label>
            <input type="text" pInputText [(ngModel)]="categoria().nome" required autofocus id="nome" [ngClass]="{ 'ng-invalid ng-dirty': submitted() && !categoria().nome }" />
            @if (submitted() && !categoria().nome) {
                <small class="p-error block">Informe o nome</small>
            }
        </div>
    `
})
export class AlteracaoCategoriaComponent implements OnInit {
    onSave = output<{ sucesso: boolean, dados: any }>();
    categoria = input<Categoria>({id: "", nome: ""});
    submitted = signal(false);
    
    constructor(private categoriaService: CategoriaService) {     
    }

    ngOnInit(): void {
    }

    gravar() {
        this.submitted.set(true);
        if (!this.categoria().nome.trim())
            return;

        this.categoriaService.alterar(this.categoria()).subscribe({
            next: (e) => { this.onSave.emit({ sucesso: true, dados: this.categoria }) },
            error: (e) => { this.onSave.emit({ sucesso: false, dados: e}) }
        });
    }
}
