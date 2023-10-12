import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormControlName, NonNullableFormBuilder, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { FormBaseComponent } from 'src/app/base-components/form-base.component';
import { CategoriaService } from 'src/app/categoria/categoria.service';
import { Categoria } from 'src/app/categoria/models/categoria';
import { FormaPagamentoService } from 'src/app/forma-pagamento/forma-pagamento.service';
import { FormaPagamento } from 'src/app/forma-pagamento/models/forma-pagamento';

import { LancamentoService } from '../lancamento.service';
import { Lancamento, LancamentoInclusao } from '../models/lancamento';
import { NovaCategoriaComponent } from 'src/app/categoria/novo/novo.component';
import { NovaFormaPagamentoComponent } from 'src/app/forma-pagamento/novo/novo.component';

@Component({
    selector: 'app-novo',
    templateUrl: './novo.component.html',
    styleUrls: ['./novo.component.scss']
})
export class NovoLancamentoComponent extends FormBaseComponent implements OnInit {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];
    @ViewChild(NovaCategoriaComponent) categoriaInclusao!: NovaCategoriaComponent;
    @ViewChild(NovaFormaPagamentoComponent) formaPagamentoInclusao!: NovaFormaPagamentoComponent;

    modalInclusaoCategoria = false;
    modalInclusaoFormaPagamento = false;
    lancamento: Partial<LancamentoInclusao> = new LancamentoInclusao();
    categorias?: Categoria[];
    formasPagamento?: FormaPagamento[];

    lancamentoForm = this.fb.group({
        nome: ['', [Validators.required]],
        descricao: ['', []],
        valor: [, [Validators.required, Validators.min(0.01)]],
        despesa: ['Sim', [Validators.required]],
        realizado: ['Sim', [Validators.required]],
        dataInclusao: [new Date(), [Validators.required]],
        rateado: ['Não', [Validators.required]],
        categoriaId: [, [Validators.required]],
        formaPagamentoId: [, [Validators.required]]
    });

    constructor(private fb: NonNullableFormBuilder, private messageService: MessageService, private categoriaService: CategoriaService, 
        private formaPagamentoService: FormaPagamentoService, private lancamentoService: LancamentoService, private ngxService: NgxUiLoaderService) {

        super();

        this.validationMessages = {
            nome: { required: "Informe o nome" },
            valor: {
                required: "Informe o valor",
                min: "Informe o valor"
            },
            dataInclusao: { required: "Informe a data" },
            categoriaId: { required: "Informe a categoria" },
            formaPagamentoId: { required: "Informe a forma de pagamento" }
        };

        super.configurarMensagensValidacaoBase(this.validationMessages);
        this.atualizarCategorias();
        this.atualizarFormasPagamento();
    }

    atualizarCategorias() {
        this.categorias = [];
        this.categoriaService.obterTodos().subscribe({
            next: (response) => this.categorias = response.sort((c1, c2) => (c1.nome > c2.nome) ? 1 : -1)
        });
    }

    atualizarFormasPagamento() {
        this.formasPagamento = [];
        this.formaPagamentoService.obterTodos().subscribe({
            next: (response) => this.formasPagamento = response.sort((f1, f2) => (f1.nome > f2.nome) ? 1 : -1)
        });
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        super.configurarValidacaoFormularioBase(this.formInputElements, this.lancamentoForm);
    }

    hideDialogCategoria() { 
        this.modalInclusaoCategoria = false; 
    }

    hideDialogFormaPagamento() { 
        this.modalInclusaoFormaPagamento = false; 
    }

    processarInclusaoCategoria(resultado: any) {
        if (resultado.sucesso) {
            this.atualizarCategorias();
            this.hideDialogCategoria();
            return;
        }
    }

    processarInclusaoFormaPagamento(resultado: any) {
        if (resultado.sucesso) {
            this.atualizarFormasPagamento();
            this.hideDialogFormaPagamento();
            return;
        }
    }

    gravar() {
        this.lancamento = this.lancamentoForm.value;

        let lancamentoIncluir = new Lancamento();
        lancamentoIncluir.nome = this.lancamentoForm.value.nome as string;
        lancamentoIncluir.descricao = this.lancamento.descricao;
        lancamentoIncluir.valor = this.lancamento.valor as number;
        lancamentoIncluir.despesa = this.lancamento.despesa === "Sim";
        lancamentoIncluir.realizado = this.lancamento.realizado === "Sim";
        lancamentoIncluir.dataInclusao = this.lancamento.dataInclusao as Date;
        lancamentoIncluir.rateado = this.lancamento.rateado === "Sim";
        lancamentoIncluir.categoriaId = this.lancamento.categoriaId;
        lancamentoIncluir.formaPagamentoId = this.lancamento.formaPagamentoId;

        this.ngxService.start()

        this.lancamentoService.incluir(lancamentoIncluir).subscribe({
            next: (response) => {
                this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Lançamento registrado com sucesso!', life: 3000 });
                this.lancamentoForm.reset();
            },
            complete: () => { this.ngxService.stop() },
            error: (e) => {
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu uma falha!', life: 3000 });
                console.log(e);
            }
        });
    }
}
