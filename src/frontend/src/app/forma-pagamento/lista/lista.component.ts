import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormaPagamentoService } from 'src/app/forma-pagamento/forma-pagamento.service';
import { FormaPagamento } from 'src/app/forma-pagamento/models/forma-pagamento';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent {
    formasPagamento: FormaPagamento[] = [];
    dialogVisible = false;
    errorsMessage: string[] = [];

    constructor(private formaPagamentoService: FormaPagamentoService, private ngxService: NgxUiLoaderService){
    }

    ngOnInit(): void {
        this.ngxService.start()
        this.atualizarFormasPagamento();
    }

    atualizarFormasPagamento() {
        this.formaPagamentoService.obterTodos().subscribe({
            next: (retorno) => {
                this.formasPagamento = retorno;
            },
            complete:() => { this.ngxService.stop() },
            error: (e) => {
                this.processarFalha(e);
            }
        });
    }

    processarFalha(fail: any) {
        fail.error.forEach((msg: string) => {
            this.errorsMessage.push(msg);
            this.dialogVisible = true;
        });
    }
}
