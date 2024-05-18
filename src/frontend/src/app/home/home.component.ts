import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { RouterOutlet } from '@angular/router';
import { TabMenuModule } from 'primeng/tabmenu';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [TabMenuModule, RouterOutlet],
    styleUrl: './home.component.scss',
    template: `
        <p-tabMenu [model]="items"></p-tabMenu>
        <div style="padding: 20px 20px 0 20px;">
            <router-outlet></router-outlet>
        </div>
    `
})
export class HomeComponent {
    title = 'financas';
    items: MenuItem[] = [
        { label: 'Lançamentos', icon: 'pi pi-fw pi-shopping-bag', routerLink: ['/lancamentos'] },
        { label: 'Categorias', icon: 'pi pi-fw pi-tags', routerLink: ['/categorias'] },
        { label: 'Formas de Pagamento', icon: 'pi pi-fw pi-credit-card', routerLink: ['/formas-de-pagamento'] }
    ];

    constructor(private primengConfig: PrimeNGConfig) {

    }

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.primengConfig.setTranslation({
            "apply": "Aplicar",
            "accept": "Sim",
            "reject": "Não",
            "cancel": "Cancelar",
            "dayNames": ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
            "dayNamesShort": ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
            "dayNamesMin": ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
            "monthNamesShort": ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
            "monthNames": ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
            "dateFormat": "dd/mm/yy",
            "today": "Hoje",
            "passwordPrompt": "Digite uma senha",
            "emptyMessage": "Nenhum registro encontrado",
            "emptyFilterMessage": "Nenhum registro encontrado"
        });
    }
}
