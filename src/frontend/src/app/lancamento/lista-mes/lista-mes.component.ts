import { Component, Input } from '@angular/core';
import { Lancamento } from '../models/lancamento';

@Component({
  selector: 'app-lista-mes',
  templateUrl: './lista-mes.component.html',
  styleUrls: ['./lista-mes.component.scss']
})
export class ListaMesComponent {
    @Input() lancamentos: Lancamento[] = []; 
}
