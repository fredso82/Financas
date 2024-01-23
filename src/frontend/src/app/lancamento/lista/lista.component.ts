import { NgClass } from '@angular/common';
import { Component, computed, HostListener, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgxUiLoaderModule, NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService, SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

import { LancamentoService } from '../lancamento.service';
import { ListaMesComponent } from '../lista-mes/lista-mes.component';
import { Lancamento } from '../models/lancamento';

@Component({
    selector: 'app-lista',
    templateUrl: './lista.component.html',
    styleUrls: ['./lista.component.css'],
    standalone: true,
    imports: [
        NgxUiLoaderModule, 
        ToastModule, 
        ButtonModule, 
        TooltipModule, 
        RouterLink, 
        TabViewModule, 
        ListaMesComponent, 
        DialogModule, 
        SharedModule,
        NgClass],
    providers: [MessageService]
})
export class ListaComponent implements OnInit {
    ano = signal(new Date().getUTCFullYear());
    mesAtual = signal(new Date().getMonth()+1);
    janeiro = computed(() => this.mesAtual() === 1);
    fevereiro = computed(() => this.mesAtual() === 2);
    marco = computed(() => this.mesAtual() === 3);
    abril = computed(() => this.mesAtual() === 4);
    maio = computed(() => this.mesAtual() === 5);
    junho = computed(() => this.mesAtual() === 6);
    julho = computed(() => this.mesAtual() === 7);
    agosto = computed(() => this.mesAtual() === 8);
    setembro = computed(() => this.mesAtual() === 9);
    outubro = computed(() => this.mesAtual() === 10);
    novembro = computed(() => this.mesAtual() === 11);
    dezembro = computed(() => this.mesAtual() === 12);

    lancamentos = signal<Lancamento[]>([]);
    modalExclusao: boolean = false;
    lancamento: Lancamento = new Lancamento();
    lancamentoService = inject(LancamentoService);

    constructor(private router: Router, private ngxService: NgxUiLoaderService, private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.ngxService.start()
        this.atualizarLancamentos();
    }

    atualizarLancamentos() {
        this.lancamentoService.obterPorMes(this.ano(), this.mesAtual()).subscribe({
            next: (retorno) => {
                this.lancamentos.set(retorno);
            },
            complete: () => { this.ngxService.stop() }
        });
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

    anoAnterior() {
        this.ano.update(a => a - 1);
        this.ngxService.start()
        this.atualizarLancamentos();
    }
    
    proximoAno() {
        this.ano.update(a => a + 1);
        this.ngxService.start()
        this.atualizarLancamentos();
    }

    setMes(mes: number) {
        this.mesAtual.set(mes);
        this.ngxService.start()
        this.atualizarLancamentos();
    }
}
