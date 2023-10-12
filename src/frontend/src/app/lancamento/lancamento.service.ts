import { Injectable } from '@angular/core';
import { BaseService } from '../services/base.service';
import { HttpClient } from '@angular/common/http';
import { Lancamento } from './models/lancamento';
import { Observable, first } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LancamentoService extends BaseService {

    constructor(private http: HttpClient) { super() }

    obterTodos(): Observable<Lancamento[]> {
        return this.http.get<Lancamento[]>(this.UrlService + "transacoes")
            .pipe(
                first()
            );
    }

    incluir(lancamento: Lancamento): Observable<Lancamento> {
        return this.http.post<Lancamento>(this.UrlService + "transacoes", lancamento)
            .pipe(
                first()
            );
    }
}