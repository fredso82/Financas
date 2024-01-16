import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormaPagamento } from '../models/forma-pagamento';
import { FormaPagamentoService } from '../forma-pagamento.service';
import { NgClass } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-forma-pagamento-novo',
    templateUrl: './novo.component.html',
    styleUrls: ['./novo.component.scss'],
    standalone: true,
    imports: [FormsModule, InputTextModule, NgClass]
})
export class NovaFormaPagamentoComponent implements OnInit {
    @Output() onSave = new EventEmitter<{ sucesso: boolean, dados: any }>();

    formaPagamento: FormaPagamento;
    submitted = false;

    constructor(private formaPagamentoService: FormaPagamentoService) {
        this.formaPagamento = {id: '', nome: ''};
    }

    ngOnInit(): void {
    }

    gravar() {
        this.submitted = true;
        if (!this.formaPagamento.nome.trim())
            return;

        this.formaPagamentoService.incluir(this.formaPagamento).subscribe({
            next: (e) => {
                this.onSave.emit({ sucesso: true, dados: e });
            },
            error: (e) => {
                this.onSave.emit({ sucesso: false, dados: e});
            }
        });
    }
}
