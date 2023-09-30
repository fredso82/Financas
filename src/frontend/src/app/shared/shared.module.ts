import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
    
@NgModule({
    exports: [
        CommonModule,
        NgxUiLoaderModule,
        DialogModule,
        ButtonModule,
        ToolbarModule,
        TableModule,
        FormsModule,
        InputTextModule,
        ReactiveFormsModule,
        ToastModule
    ]
  })
  export class SharedModule { }
  