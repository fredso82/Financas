import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { LancamentoService } from '../lancamento.service';
import { Lancamento } from '../models/lancamento';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { NgIf, CurrencyPipe, DatePipe } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-lista-mes',
    templateUrl: './lista-mes.component.html',
    styleUrls: ['./lista-mes.component.scss'],
    standalone: true,
    imports: [TableModule, SharedModule, NgIf, TooltipModule, ButtonModule, CurrencyPipe, DatePipe]
})
export class ListaMesComponent {
    @Input() lancamentos: Lancamento[] = [];
    @Output() onDelete = new EventEmitter<Lancamento>();

    constructor(private router: Router) {
    }

    get total() {
        if (!this.lancamentos)
            return "";

        return this.lancamentos.reduce((total, lancamento) => total + lancamento.valor, 0);
    }

    alterar(id: number) {
        this.router.navigate([`/lancamentos/alterar/${id}`]);
    }

    excluir(lancamento: Lancamento) {
        this.onDelete.emit(lancamento);
    }
}
