import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { FocusTrapModule } from 'primeng/focustrap';
import { AutoFocusModule } from 'primeng/autofocus';

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
        ToastModule,
        TooltipModule,
        TabViewModule,
        DropdownModule,
        CardModule,
        InputNumberModule,
        CheckboxModule,
        CalendarModule,
        FocusTrapModule,
        AutoFocusModule
    ]
  })
  export class SharedModule { }
  