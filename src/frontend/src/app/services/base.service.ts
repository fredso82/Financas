import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { of, throwError } from "rxjs";
import { environment } from "src/environments/environment";

export abstract class BaseService {
    protected UrlService: string = environment.apiUrl;
    
    protected serviceError(response: Response | any) {
        let customError: string[] = [];
        let customResponse = { error: { erros: [] } }
        
        if (response instanceof HttpErrorResponse) {
            
            if (response.statusText === "Unknown Error") {
                customError.push("Ocorreu um erro desconhecido");
                response.error.erros = customError;
                console.log(response);
            }
        }
        
        if (response.status === 500) {
            customError.push("Ocorreu um erro no processamento, tente novamente mais tarde ou contate o nosso suporte");
            console.log(customError);
            //customResponse.error.erros = customError;
            //return throwError(() => customError);
        }

        if (response.status === 403) {
            customError.push("Você não possui permissão para realizar essa operação!");
            // customResponse.error.erros = customError;
            //return throwError(() => customError);

            console.log(customError);
        }

        if (response.name === "TimeoutError") {
            customError.push("O tempo de resposta fois mais longo que o esperado");
            response = { error: { erros: customError }};
            console.log(response);
        }

        return of([]);
    }
}