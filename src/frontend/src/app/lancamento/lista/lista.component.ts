import { Component, HostListener, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormaPagamentoService } from 'src/app/forma-pagamento/forma-pagamento.service';
import { FormaPagamento } from 'src/app/forma-pagamento/models/forma-pagamento';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent {
    modalInclusao = false;

    @HostListener('document:keydown', ['$event'])
    handleKeyDown(event: KeyboardEvent): void {
        const targetElement = event.target as HTMLElement;
        if (targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA') {
            return;
        }
        
        if (event.altKey && event.key === 'n') {
            this.modalInclusao = true;
        }
    }

    hideDialog() {
        this.modalInclusao = false;
    }
}
