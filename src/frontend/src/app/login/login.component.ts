import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    router = inject(Router);
    login = "";
    senha = "";

    entrar() : void {
        if (this.login == "admin" && this.senha && "admin") {
            this.router.navigateByUrl("/");
            return;
        }
        alert("Login ou senha inválidos");
    }
}

