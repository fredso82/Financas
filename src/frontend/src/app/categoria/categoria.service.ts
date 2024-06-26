import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, first, of, take } from 'rxjs';

import { BaseService } from '../services/base.service';
import { Categoria } from './models/categoria';

@Injectable({
    providedIn: 'root'
})
export class CategoriaService extends BaseService {

    constructor(private http: HttpClient) { super() }

    obterTodos() {
        return this.http.get<Categoria[]>(this.UrlService + "categorias")
            .pipe(
                catchError(this.serviceError),
                first()
            );
    }

    incluir(categoria: Categoria): Observable<Categoria> {
        return this.http.post<Categoria>(this.UrlService + "categorias", categoria)
            .pipe(
                first()
            );
    }

    alterar(categoria: Categoria): Observable<Categoria> {
        return this.http.put<Categoria>(`${this.UrlService}categorias/${categoria.id}`, categoria)
            .pipe(
                first()
            );
    }

    excluir(id: string): Observable<Categoria> {
        return this.http.delete<Categoria>(`${this.UrlService}categorias/${id}`)
            .pipe(
                first()
            );
    }
}
