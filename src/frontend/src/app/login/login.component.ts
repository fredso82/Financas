import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { LoginService } from './login.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, InputTextModule, ButtonModule, ReactiveFormsModule, CardModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    router = inject(Router);
    loginForm!: FormGroup;
    loginInvalido = signal(false);

    constructor(private fb: FormBuilder, private loginService: LoginService) {
        this.loginForm = this.fb.group({
            login: ['', [Validators.required]],
            senha: ['', [Validators.required]]
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.loginInvalido.set(false);
            this.loginService.efetuarLogin(this.loginForm.value.login, this.loginForm.value.senha).subscribe({
                next: (response) => {
                    localStorage.setItem("financas.token", response);
                    this.router.navigateByUrl("/");
                },
                error: (e) => {
                    if (e.status === 404) {
                        this.loginInvalido.set(true);
                        return;
                    }
                    alert("Ocorreu um erro desconhecido!")
                    console.log(e);
                }
            });
            // if (this.loginForm.value.login == "admin" && this.loginForm.value.senha == "admin") {
            //     this.router.navigateByUrl("/");
            //     return;
            // }
            // alert("Login ou senha inválidos");
        }
    }
    // entrar() : void {
    //     if (this.login == "admin" && this.senha && "admin") {
    //         this.router.navigateByUrl("/");
    //         return;
    //     }
    //     alert("Login ou senha inválidos");
    // }
}

