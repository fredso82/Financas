import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { LancamentoService } from '../lancamento.service';
import { Lancamento } from '../models/lancamento';

@Component({
    selector: 'app-lista-mes',
    templateUrl: './lista-mes.component.html',
    styleUrls: ['./lista-mes.component.scss']
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
