import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';

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

    constructor(private fb: FormBuilder){
        this.loginForm = this.fb.group({
            login: ['', [Validators.required]],
            senha: ['', [Validators.required]]
        });
    }

    onSubmit() {
        if (this.loginForm.valid){
            if (this.loginForm.value.login == "admin" && this.loginForm.value.senha == "admin") {
                this.router.navigateByUrl("/");
                return;
            }
            alert("Login ou senha inválidos");
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

