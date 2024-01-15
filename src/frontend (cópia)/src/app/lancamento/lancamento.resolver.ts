import { Injectable } from "@angular/core";
import { Lancamento } from "./models/lancamento";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { LancamentoService } from "./lancamento.service";
import { Observable, first, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LancamentoResolver implements Resolve<Lancamento> {
    constructor(private lancamentoService: LancamentoService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Lancamento> {
        if (route.params && route.params["id"]){
            return this.lancamentoService.obterPorId(route.params["id"]);
        }
        return of(new Lancamento());
    }

}