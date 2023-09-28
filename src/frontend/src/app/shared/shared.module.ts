import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
    
@NgModule({
    exports: [
        CommonModule,
        NgxUiLoaderModule,
        DialogModule,
        ButtonModule,
        ToolbarModule,
        TableModule
    ]
  })
  export class SharedModule { }
  