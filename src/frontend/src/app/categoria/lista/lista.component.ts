import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { CategoriaService } from '../categoria.service';
import { Categoria } from '../models/categoria';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  categorias: Categoria[] = [];
  dialogVisible = false;
  errorsMessage: string[] = [];
  
  constructor(private categoriaService: CategoriaService, private ngxService: NgxUiLoaderService){
  }

  ngOnInit(): void {
    this.ngxService.start()
    this.categoriaService.obterTodos()
      .subscribe({
        next: (retorno) => {
          this.categorias = retorno;
        },
        complete: () => {this.ngxService.stop()},
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
}
