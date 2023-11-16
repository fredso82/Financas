import { Component, Input } from '@angular/core';
import { Lancamento } from '../models/lancamento';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-mes',
  templateUrl: './lista-mes.component.html',
  styleUrls: ['./lista-mes.component.scss']
})
export class ListaMesComponent {
    @Input() lancamentos: Lancamento[] = []; 

    constructor(private router: Router)
    {
        
    }
    get total() {
        if (!this.lancamentos)
            return "";

        return this.lancamentos.reduce((total, lancamento) => total + lancamento.valor, 0);
    }

    alterar(id: number) {
        this.router.navigate([`/lancamentos/alterar/${id}`]);
    }
}
