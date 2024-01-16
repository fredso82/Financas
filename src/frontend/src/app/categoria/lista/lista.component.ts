import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgxUiLoaderService, NgxUiLoaderModule } from 'ngx-ui-loader';

import { CategoriaService } from '../categoria.service';
import { Categoria } from '../models/categoria';
import { NovaCategoriaComponent } from '../novo/novo.component';
import { AlteracaoCategoriaComponent } from '../alteracao/alteracao.component';
import { MessageService, SharedModule } from 'primeng/api';

import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-lista',
    templateUrl: './lista.component.html',
    styleUrls: ['./lista.component.css'],
    standalone: true,
    imports: [NgxUiLoaderModule, ToastModule, ButtonModule, TooltipModule, TableModule, SharedModule, DialogModule, NovaCategoriaComponent, AlteracaoCategoriaComponent],
    providers: [MessageService]
})
export class ListaComponent implements OnInit {
    @ViewChild(NovaCategoriaComponent) categoriaInclusao!: NovaCategoriaComponent;
    @ViewChild(AlteracaoCategoriaComponent) categoriaAlteracao!: AlteracaoCategoriaComponent;

    categorias: Categoria[] = [];
    categoria: Categoria = { id: "", nome: "" };
    dialogVisible = false;
    errorsMessage: string[] = [];
    modalInclusao = false;
    modalAlteracao = false;
    modalExclusao = false;

    constructor(private categoriaService: CategoriaService, private ngxService: NgxUiLoaderService, private messageService: MessageService) {
    }
    
    ngOnInit(): void {
        this.ngxService.start()
        this.atualizarCategorias();
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

    processarFalha(fail: any) {
        fail.error.forEach((msg: string) => {
            this.errorsMessage.push(msg);
            this.dialogVisible = true;
        });
    }

    atualizarCategorias() {
        this.categoriaService.obterTodos()
            .subscribe({
                next: (retorno) => {
                    this.categorias = retorno;
                },
                complete: () => { this.ngxService.stop() },
                error: (e) => {
                    this.processarFalha(e);
                }
            });
    }
    hideDialog() {
        this.modalInclusao = false;
        this.modalAlteracao = false;
    }


    editar(categoria: Categoria) {
        this.categoria = { ...categoria };
        this.modalAlteracao = true;
    }

    excluir(categoria: Categoria) {
        this.categoria = { ...categoria };
        this.modalExclusao = true;
    }

    confirmarExclusao() {
        this.modalExclusao = false;
        this.categoriaService.excluir(this.categoria.id).subscribe({
            next: () => {
                this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Categoria excluída com sucesso!', life: 3000 });
                this.atualizarCategorias()
            },
            error: (e) => this.processarFalha(e)
        });
    }

    processarInclusao(resultado: any) {
        this.errorsMessage = [];
        if (resultado.sucesso) {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Categoria incluída com sucesso!', life: 3000 });
            this.hideDialog();
            this.atualizarCategorias();
            return;
        }
        this.processarFalha(resultado.dados);
    }

    processarAlteracao(resultado: any) {
        this.errorsMessage = [];
        if (resultado.sucesso) {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Categoria alterada com sucesso!', life: 3000 });
            this.hideDialog();
            this.atualizarCategorias();
            return;
        }
        this.processarFalha(resultado.dados);
    }
}
