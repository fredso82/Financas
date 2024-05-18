import { Component, HostListener, OnInit, ViewChild, signal } from '@angular/core';
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

    categorias = signal<Categoria[]>([]);
    categoria = signal<Categoria>({ id: "", nome: "" });
    errorsMessage = signal<string[]>([]);
    dialogVisible = signal(false);
    modalInclusao = signal(false);
    modalAlteracao = signal(false);
    modalExclusao = signal(false);

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
            this.modalInclusao.set(true);
        }
    }

    processarFalha(fail: any) {
        fail.error.forEach((msg: string) => {
            this.errorsMessage.update(values => [...values, msg]);
            this.dialogVisible.set(true);
        });
    }

    atualizarCategorias() {
        this.categoriaService.obterTodos()
            .subscribe({
                next: (retorno) => { this.categorias.set(retorno) },
                complete: () => { this.ngxService.stop() },
                error: (e) => { this.processarFalha(e) }
            });
    }

    hideDialog() {
        this.modalInclusao.set(false);
        this.modalAlteracao.set(false);
    }


    editar(categoria: Categoria) {
        this.categoria.set({ ...categoria });
        this.modalAlteracao.set(true);
    }

    excluir(categoria: Categoria) {
        this.categoria.set({ ...categoria });
        this.modalExclusao.set(true);
    }

    confirmarExclusao() {
        this.modalExclusao.set(false);
        this.categoriaService.excluir(this.categoria().id).subscribe({
            next: () => {
                this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Categoria excluída com sucesso!', life: 3000 });
                this.atualizarCategorias()
            },
            error: (e) => this.processarFalha(e)
        });
    }

    processarInclusao(resultado: any) {
        this.errorsMessage.set([]);
        if (resultado.sucesso) {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Categoria incluída com sucesso!', life: 3000 });
            this.hideDialog();
            this.atualizarCategorias();
            return;
        }
        this.processarFalha(resultado.dados);
    }

    processarAlteracao(resultado: any) {
        this.errorsMessage.set([]);
        if (resultado.sucesso) {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Categoria alterada com sucesso!', life: 3000 });
            this.hideDialog();
            this.atualizarCategorias();
            return;
        }
        this.processarFalha(resultado.dados);
    }
}
