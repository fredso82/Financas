import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first, take } from 'rxjs';

import { BaseService } from '../services/base.service';
import { Categoria } from './models/categoria';

@Injectable({
    providedIn: 'root'
})
export class CategoriaService extends BaseService {

    constructor(private http: HttpClient) { super() }

    obterTodos(): Observable<Categoria[]> {
        return this.http.get<Categoria[]>(this.UrlService + "categorias", this.obterAuthHeaderJson())
            .pipe(
                first()
            );
    }

    incluir(categoria: Categoria): Observable<Categoria> {
        return this.http.post<Categoria>(this.UrlService + "categorias", categoria, this.obterAuthHeaderJson())
            .pipe(
                first()
            );
    }

    alterar(categoria: Categoria): Observable<Categoria> {
        return this.http.put<Categoria>(`${this.UrlService}categorias/${categoria.id}`, categoria, this.obterAuthHeaderJson())
            .pipe(
                first()
            );
    }

    excluir(id: string): Observable<Categoria> {
        return this.http.delete<Categoria>(`${this.UrlService}categorias/${id}`, this.obterAuthHeaderJson())
            .pipe(
                first()
            );
    }
}
