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

    obterPorId(id: number): Observable<Lancamento> {
        return this.http.get<Lancamento>(this.UrlService + "transacoes/" + id)
            .pipe(first());
    }

    incluir(lancamento: Lancamento): Observable<Lancamento> {
        return this.http.post<Lancamento>(this.UrlService + "transacoes", lancamento)
            .pipe(
                first()
            );
    }

    alterar(lancamento: Lancamento): Observable<Lancamento> {
        return this.http.put<Lancamento>(this.UrlService + "transacoes/" + lancamento.id!, lancamento)
            .pipe(
                first()
            );
    }

    excluir(id: string): Observable<Lancamento> {
        return this.http.delete<Lancamento>(this.UrlService + "transacoes/" + id)
            .pipe(
                first()
            );
    }
}
