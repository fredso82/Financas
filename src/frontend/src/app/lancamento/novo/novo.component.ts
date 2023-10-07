import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Lancamento, LancamentoInclusao } from '../models/lancamento';
import { Categoria } from 'src/app/categoria/models/categoria';
import { CategoriaService } from 'src/app/categoria/categoria.service';
import { FormaPagamento } from 'src/app/forma-pagamento/models/forma-pagamento';
import { FormaPagamentoService } from 'src/app/forma-pagamento/forma-pagamento.service';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.scss']
})
export class NovoLancamentoComponent implements OnInit {
    lancamento: Partial<LancamentoInclusao> = new LancamentoInclusao();
    categorias?: Categoria[];
    formasPagamento?: FormaPagamento[];

    // lancamentoForm = this.fb.group({
    //     nome: ['', [Validators.required]],
    //     descricao: ['', []],
    //     valor: [0, [Validators.required]],
    //     despesa: ['Sim', [Validators.required]],
    //     realizado: ['Sim', [Validators.required]],
    //     dataInclusao: [new Date(), [Validators.required]],
    //     rateado: ['Não', [Validators.required]],
    //     categoriaId: ['', [Validators.required]],
    //     formaPagamentoId: ['', [Validators.required]]
    // });

    lancamentoForm = this.fb.group({
        nome: ['', []],
        descricao: ['', []],
        valor: [0, []],
        despesa: ['Sim', []],
        realizado: ['Sim', []],
        dataInclusao: [new Date(), []],
        rateado: ['Não', []],
        categoriaId: ['', []],
        formaPagamentoId: ['', []]
    });

    constructor(private fb: NonNullableFormBuilder, private messageService: MessageService, private router: Router,
        private categoriaService: CategoriaService, private formaPagamentoService: FormaPagamentoService){
            
        // this.lancamentoForm = this.fb.group({
        //     nome: ['', [Validators.required]],
        //     descricao: ['', []],
        //     valor: [0, [Validators.required]],
        //     despesa: ['Sim', [Validators.required]],
        //     realizado: ['Sim', [Validators.required]],
        //     dataInclusao: [new Date(), [Validators.required]],
        //     rateado: ['Não', [Validators.required]],
        //     categoriaId: ['', [Validators.required]],
        //     formaPagamentoId: ['', [Validators.required]]
        // });
        this.categoriaService.obterTodos().subscribe({
            next: (response) => this.categorias = response
        });

        this.formaPagamentoService.obterTodos().subscribe({
            next: (response) => this.formasPagamento = response
        });
    }

    ngOnInit(): void {        
    }

    gravar() {
        this.lancamento = this.lancamentoForm.value;
        console.log(this.lancamento);
    }

}
