import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    title = 'financas';
    items: MenuItem[] = [
        { label: 'Lançamentos', icon: 'pi pi-fw pi-shopping-bag', routerLink: ['/lancamentos'] },
        { label: 'Categorias', icon: 'pi pi-fw pi-tags', routerLink: ['/categorias'] },
        { label: 'Formas de Pagamento', icon: 'pi pi-fw pi-credit-card', routerLink: ['/formas-de-pagamento'] }
    ];
}
