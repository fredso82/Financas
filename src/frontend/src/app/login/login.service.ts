import { Injectable } from '@angular/core';
import { BaseService } from '../services/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable, first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {

  constructor(private http: HttpClient) { super() }

  efetuarLogin(login: string, senha: string): Observable<any> {
    return this.http.post(this.UrlService + "login", {login, senha}).pipe(first());
  }
}
