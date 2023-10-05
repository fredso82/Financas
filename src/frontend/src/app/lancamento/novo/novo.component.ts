import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Lancamento } from '../models/lancamento';
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
    lancamentoForm: FormGroup;
    lancamento: Lancamento = new Lancamento();
    categorias?: Categoria[];
    formasPagamento?: FormaPagamento[];

    constructor(private fb: FormBuilder, private messageService: MessageService, private router: Router,
        private categoriaService: CategoriaService, private formaPagamentoService: FormaPagamentoService){

        this.lancamentoForm = this.fb.group({
            nome: ['', [Validators.required]],
            descricao: ['', []],
            valor: [0, [Validators.required]],
            despesa: [true, [Validators.required]],
            realizado: [true, [Validators.required]],
            dataInclusao: ['', [Validators.required]],
            rateado: [false, [Validators.required]],
            categoriaId: ['', [Validators.required]],
            formaPagamentoId: ['', [Validators.required]]
        });

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
        this.lancamento = {...this.lancamentoForm.value};
        console.log(this.lancamento);
    }

}
