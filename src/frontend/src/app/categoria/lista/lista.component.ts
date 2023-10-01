import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { CategoriaService } from '../categoria.service';
import { Categoria } from '../models/categoria';
import { NovaCategoriaComponent } from '../novo/novo.component';
import { AlteracaoCategoriaComponent } from '../alteracao/alteracao.component';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-lista',
    templateUrl: './lista.component.html',
    styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
    @ViewChild(NovaCategoriaComponent) categoriaInclusao!: NovaCategoriaComponent;
    @ViewChild(AlteracaoCategoriaComponent) categoriaAlteracao!: AlteracaoCategoriaComponent;

    categorias: Categoria[] = [];
    categoria: Categoria = {id: "", nome: ""};
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

    processarFalha(fail: any) {
        fail.error.forEach((msg: string) => {
            this.errorsMessage.push(msg);
            this.dialogVisible = true;
        });
    }

    atualizarCategorias()
    {
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
