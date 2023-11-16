import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormControlName, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { CategoriaService } from 'src/app/categoria/categoria.service';
import { FormaPagamentoService } from 'src/app/forma-pagamento/forma-pagamento.service';

import { LancamentoService } from '../lancamento.service';
import { Lancamento } from '../models/lancamento';
import { Categoria } from 'src/app/categoria/models/categoria';
import { FormaPagamento } from 'src/app/forma-pagamento/models/forma-pagamento';
import { FormBaseComponent } from 'src/app/base-components/form-base.component';
import { NovaCategoriaComponent } from 'src/app/categoria/novo/novo.component';
import { NovaFormaPagamentoComponent } from 'src/app/forma-pagamento/novo/novo.component';

@Component({
    selector: 'app-alterar',
    templateUrl: './alterar.component.html',
    styleUrls: ['./alterar.component.scss']
})
export class AlterarLancamentoComponent extends FormBaseComponent implements OnInit {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];
    @ViewChild(NovaCategoriaComponent) categoriaInclusao!: NovaCategoriaComponent;
    @ViewChild(NovaFormaPagamentoComponent) formaPagamentoInclusao!: NovaFormaPagamentoComponent;
    
    lancamento: Lancamento = new Lancamento();
    modalInclusaoCategoria = false;
    modalInclusaoFormaPagamento = false;
    categorias?: Categoria[];
    formasPagamento?: FormaPagamento[];

    lancamentoForm = this.fb.group({
        valor: [0, [Validators.required, Validators.min(0.01)]],
        nome: ['', [Validators.required]],
        descricao: ['', []],
        despesa: ['Sim', [Validators.required]],
        realizado: ['Sim', [Validators.required]],
        dataInclusao: [new Date(), [Validators.required]],
        rateado: ['Não', [Validators.required]],
        categoriaId: ['', [Validators.required]],
        formaPagamentoId: ['', [Validators.required]]
    });
    

    constructor(private fb: NonNullableFormBuilder, private messageService: MessageService, private lancamentoService: LancamentoService,
        private categoriaService: CategoriaService, private formaPagamentoService: FormaPagamentoService, private route: ActivatedRoute,
        private ngxService: NgxUiLoaderService, private router: Router) {

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

        this.lancamento = this.route.snapshot.data["lancamento"];
        const dataInclusao = new Date(this.lancamento.dataInclusao);

        this.lancamentoForm.setValue({
            nome: this.lancamento.nome,
            descricao: this.lancamento.descricao!,
            valor: this.lancamento.valor,
            despesa: this.lancamento.despesa === true ? "Sim" : "Não",
            realizado: this.lancamento.realizado === true ? "Sim" : "Não",
            dataInclusao: dataInclusao,
            rateado: this.lancamento.rateado === true ? "Sim" : "Não",
            categoriaId: this.lancamento.categoria?.id as string,
            formaPagamentoId: this.lancamento.formaPagamento?.id as string
        });


        super.configurarMensagensValidacaoBase(this.validationMessages);
        this.atualizarCategorias();
        this.atualizarFormasPagamento();
    }
    
    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        super.configurarValidacaoFormularioBase(this.formInputElements, this.lancamentoForm);
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
        this.lancamento.nome = this.lancamentoForm.value.nome!;
        this.lancamento.descricao = this.lancamentoForm.value.descricao;
        this.lancamento.valor = this.lancamentoForm.value.valor as number;
        this.lancamento.despesa = this.lancamentoForm.value.despesa === "Sim";
        this.lancamento.realizado = this.lancamentoForm.value.realizado === "Sim";
        this.lancamento.dataInclusao = this.lancamentoForm.value.dataInclusao!;
        this.lancamento.rateado = this.lancamentoForm.value.rateado === "Sim";
        this.lancamento.categoriaId = this.lancamentoForm.value.categoriaId;
        this.lancamento.formaPagamentoId = this.lancamentoForm.value.formaPagamentoId;

        this.ngxService.start();

        this.lancamentoService.alterar(this.lancamento).subscribe({
            next: (response) => {
                this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Lançamento alterado com sucesso!', life: 3000 });
                setTimeout(() => {
                    this.router.navigate(['/lancamentos']);
                }, 1000);
                
            },
            complete: () => { this.ngxService.stop() },
            error: (e) => {
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu uma falha!', life: 3000 });
                console.log(e);
            }
        });
    }
}
