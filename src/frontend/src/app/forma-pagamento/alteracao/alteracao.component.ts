import { Component, EventEmitter, Input, OnInit, Output, input, output } from '@angular/core';
import { FormaPagamento } from '../models/forma-pagamento';
import { FormaPagamentoService } from '../forma-pagamento.service';
import { NgClass } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-forma-pagamento-alteracao',
    templateUrl: './alteracao.component.html',
    standalone: true,
    imports: [
    FormsModule,
    InputTextModule,
    NgClass
],
})
export class AlteracaoFormaPagamentoComponent implements OnInit {
    onSave = output<{ sucesso: boolean, dados: any }>();
    formaPagamento = input<FormaPagamento>({id: "", nome: ""});
    submitted = false;

    constructor(private formaPagamentoService: FormaPagamentoService) {
    }

    ngOnInit(): void {
    }

    gravar() {
        this.submitted = true;
        if (!this.formaPagamento().nome.trim())
            return;

        this.formaPagamentoService.alterar(this.formaPagamento()).subscribe({
            next: (e) => {
                this.onSave.emit({ sucesso: true, dados: this.formaPagamento });
            },
            error: (e) => {
                this.onSave.emit({ sucesso: false, dados: e});
            }
        });
    }
}
