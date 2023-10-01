import { Component, HostListener, ViewChild } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormaPagamentoService } from 'src/app/forma-pagamento/forma-pagamento.service';
import { FormaPagamento } from 'src/app/forma-pagamento/models/forma-pagamento';
import { NovaFormaPagamentoComponent } from '../novo/novo.component';
import { MessageService } from 'primeng/api';
import { AlteracaoFormaPagamentoComponent } from '../alteracao/alteracao.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent {
    @ViewChild(NovaFormaPagamentoComponent) formaPagamentoInclusao!: NovaFormaPagamentoComponent;
    @ViewChild(AlteracaoFormaPagamentoComponent) formaPagamentoAlteracao!: AlteracaoFormaPagamentoComponent;

    formasPagamento: FormaPagamento[] = [];
    formaPagamento: FormaPagamento = {id: "", nome: ""};
    dialogVisible = false;
    errorsMessage: string[] = [];
    modalInclusao = false;
    modalAlteracao = false;
    modalExclusao = false;

    constructor(private formaPagamentoService: FormaPagamentoService, private ngxService: NgxUiLoaderService, private messageService: MessageService){
    }

    ngOnInit(): void {
        this.ngxService.start()
        this.atualizarFormasPagamento();
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyDown(event: KeyboardEvent): void {
        const targetElement = event.target as HTMLElement;
        if (targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA') {
            return;
        }
        
        if (event.altKey && event.key === 'n') {
            this.modalInclusao = true;
        }
    }

    hideDialog() {
        this.modalInclusao = false;
        this.modalAlteracao = false;
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

    processarInclusao(resultado: any) {
        this.errorsMessage = [];
        if (resultado.sucesso) {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Forma de Pagamento incluída com sucesso!', life: 3000 });
            this.hideDialog();
            this.atualizarFormasPagamento();
            return;
        }
        this.processarFalha(resultado.dados);
    }

    editar(formaPagamento: FormaPagamento) {
        this.formaPagamento = { ...formaPagamento };
        this.modalAlteracao = true;
    }

    processarAlteracao(resultado: any) {
        this.errorsMessage = [];
        if (resultado.sucesso) {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Forma de pagamento alterada com sucesso!', life: 3000 });
            this.hideDialog();
            this.atualizarFormasPagamento();
            return;
        }
        this.processarFalha(resultado.dados);
    }

    excluir(formaPagamento: FormaPagamento) {
        this.formaPagamento = { ...formaPagamento };
        this.modalExclusao = true;
    }

    confirmarExclusao() {
        this.modalExclusao = false;
        this.formaPagamentoService.excluir(this.formaPagamento.id).subscribe({
            next: () => {
                this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Forma de pagamento excluída com sucesso!', life: 3000 });
                this.atualizarFormasPagamento()
            },
            error: (e) => this.processarFalha(e)
        });
    }
}
