import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { environment } from "src/environments/environment";

export abstract class BaseService {
    protected UrlService: string = environment.apiUrl;
}