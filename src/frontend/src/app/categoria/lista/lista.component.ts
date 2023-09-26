import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../categoria.service';
import { Categoria } from '../models/categoria';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  categorias: Categoria[] = [];

  constructor(private categoriaService: CategoriaService){

  }

  ngOnInit(): void {
    this.categoriaService.obterTodos()
      .subscribe({
        next: (retorno) => {
          console.log(retorno);
          this.categorias = retorno;
        }
      });
  }

}
