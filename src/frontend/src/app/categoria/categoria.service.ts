import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';

import { BaseService } from '../services/base.service';
import { Categoria } from './models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends BaseService {

  constructor(private http: HttpClient) { super() }

  obterTodos(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.UrlService + "categorias")
		.pipe(
        map(this.extractData),
        catchError(super.serviceError)
      );
  }
}
