import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { Categoria } from '../models/categoria';
import { CategoriaService } from '../categoria.service';
import { NgClass } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { output } from '@angular/core';

@Component({
    selector: 'app-categoria-novo',
    standalone: true,
    imports: [FormsModule, InputTextModule, NgClass],
    template: `
        <div class="field">
            <label for="nome">Nome <span class="obrigatorio">*</span></label>
            <input type="text" pInputText [(ngModel)]="categoria().nome" required autofocus id="nome" 
                [ngClass]="{ 'ng-invalid ng-dirty': submitted() && !categoria().nome }" />
                
            @if (submitted() && !categoria().nome) {
                <small class="p-error block">Informe o nome</small>
            }
        </div>
    `
})
export class NovaCategoriaComponent implements OnInit {
    onSave = output<{ sucesso: boolean, dados: any }>();

    categoria = signal<Categoria>({ id: "", nome: "" });
    submitted = signal(false);

    constructor(private categoriaService: CategoriaService) {
        this.categoria.set({ id: "", nome: "" });
    }
    
    ngOnInit(): void {}

    gravar() {
        this.submitted.set(true);
        if (!this.categoria().nome.trim())
            return;

        this.categoriaService.incluir(this.categoria()).subscribe({
            next: (e) => { this.onSave.emit({ sucesso: true, dados: this.categoria })},
            error: (e) => { this.onSave.emit({ sucesso: false, dados: e })}
        });
    }
}
