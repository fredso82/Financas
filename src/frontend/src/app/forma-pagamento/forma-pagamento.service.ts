import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../services/base.service';
import { Observable, first } from 'rxjs';
import { FormaPagamento } from './models/forma-pagamento';

@Injectable({
    providedIn: 'root'
})
export class FormaPagamentoService extends BaseService {

    constructor(private http: HttpClient) { super() }

    obterTodos(): Observable<FormaPagamento[]> {
        return this.http.get<FormaPagamento[]>(this.UrlService + "formas-de-pagamento")
            .pipe(
                first()
            );
    }

    incluir(formaPagamento: FormaPagamento): Observable<FormaPagamento> {
        return this.http.post<FormaPagamento>(this.UrlService + "formas-de-pagamento", formaPagamento)
            .pipe(
                first()
            );
    }

    alterar(formaPagamento: FormaPagamento): Observable<FormaPagamento> {
        return this.http.put<FormaPagamento>(`${this.UrlService}formas-de-pagamento/${formaPagamento.id}`, formaPagamento)
            .pipe(
                first()
            );
    }

    excluir(id: string): Observable<FormaPagamento> {
        return this.http.delete<FormaPagamento>(`${this.UrlService}formas-de-pagamento/${id}`)
            .pipe(
                first()
            );
    }
}
