import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { throwError } from "rxjs";
import { environment } from "src/environments/environment";

export abstract class BaseService {
    protected UrlService: string = environment.apiUrl;

    protected obterHeaderJson() {
        return {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
    }

    protected obterAuthHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('financas.token')}`
            })
        };
    }
    
    protected serviceError(response: Response | any) {
        let customError: string[] = [];
        let customResponse = { error: { erros: [] } }

        if (response instanceof HttpErrorResponse) {
            
            if (response.statusText === "Unknown Error") {
                customError.push("Ocorreu um erro desconhecido");
                response.error.erros = customError;
            }
        }
        
        if (response.status === 500) {
            customError.push("Ocorreu um erro no processamento, tente novamente mais tarde ou contate o nosso suporte");
            // customResponse.error.erros = customError;
            // return throwError(() => customResponse);
        }

        if (response.status === 403) {
            customError.push("Você não possui permissão para realizar essa operação!");
            // customResponse.error.erros = customError;

            // return throwError(() => customResponse);
        }

        if (response.name === "TimeoutError") {
            customError.push("O tempo de resposta fois mais longo que o esperado");
            //response = { error: { erros: customError }};
        }

        return throwError(() => response);
    }
}