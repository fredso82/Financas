import { Component, EventEmitter, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormaPagamentoService } from 'src/app/forma-pagamento/forma-pagamento.service';
import { FormaPagamento } from 'src/app/forma-pagamento/models/forma-pagamento';
import { Lancamento } from '../models/lancamento';
import { LancamentoService } from '../lancamento.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-lista',
    templateUrl: './lista.component.html',
    styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

    lancamentos: Lancamento[] = [];
    lancamentosAgrupados = new Map<number, Lancamento[]>();
    mesAtual: number = new Date().getMonth();
    urlService: string = environment.apiUrl;
    modalExclusao: boolean = false;
    lancamento: Lancamento = new Lancamento();

    constructor(private http: HttpClient, private router: Router, private lancamentoService: LancamentoService, private ngxService: NgxUiLoaderService, private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.ngxService.start()
        this.atualizarLancamentos();
    }

    atualizarLancamentos() {
        this.http.get<Lancamento[]>(this.urlService + "transacoes").subscribe({
            next: (retorno) => {
                this.lancamentos = retorno;
                this.lancamentosAgrupados = this.filtrarEAgruparPorMes(retorno, 2023);
            },
            complete: () => { this.ngxService.stop() }
        }
        );

        // this.lancamentoService.obterTodos().subscribe({
        //     next: (retorno) => {
        //         this.lancamentos = retorno;
        //         this.lancamentosAgrupados = this.filtrarEAgruparPorMes(retorno, 2023);
        //     },
        //     complete:() => { this.ngxService.stop() }
        // });
    }

    filtrarEAgruparPorMes(lancamentos: Lancamento[], ano: number): Map<number, Lancamento[]> {
        const lancamentosFiltradosPorAno = lancamentos.filter(lancamento => {
            const dataLancamento = new Date(lancamento.dataInclusao);
            return dataLancamento.getFullYear() === ano;
        });

        const lancamentosAgrupadosPorMes = new Map<number, Lancamento[]>();

        for (const lancamento of lancamentosFiltradosPorAno) {
            const dataLancamento = new Date(lancamento.dataInclusao);
            const mes = dataLancamento.getMonth() + 1;

            if (!lancamentosAgrupadosPorMes.has(mes)) {
                lancamentosAgrupadosPorMes.set(mes, []);
            }

            lancamentosAgrupadosPorMes.get(mes)?.push(lancamento);
        }

        return lancamentosAgrupadosPorMes;
    }

    
    obterRealizadoNoMes(mes: number, realizado: boolean): Lancamento[]{
        const retorno = this.lancamentosAgrupados.get(mes)?.filter(l => { return l.realizado === realizado});
        return retorno!;
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyDown(event: KeyboardEvent): void {
        const targetElement = event.target as HTMLElement;
        if (targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA') {
            return;
        }

        if (event.altKey && event.key === 'n') {
            this.router.navigate(['/lancamentos/novo'])
        }
    }

    excluir(lancamento: Lancamento) {
        this.lancamento = lancamento;
        this.modalExclusao = true;
    }

    confirmarExclusao() {
        this.modalExclusao = false;
        this.ngxService.start()
        this.lancamentoService.excluir(this.lancamento.id!).subscribe({
            next: () => {
                this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Lançamento excluído com sucesso!', life: 3000 });
                this.atualizarLancamentos();
            }
        });

    }
}
