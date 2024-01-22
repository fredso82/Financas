import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { importProvidersFrom, LOCALE_ID } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { TabMenuModule } from 'primeng/tabmenu';

import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/app.routes';
import { httpInterceptor } from './app/services/http.interceptor';



bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, TabMenuModule),
        { provide: LOCALE_ID, useValue: "pt" },
        provideHttpClient(withInterceptors([httpInterceptor])),
        provideAnimations(),
        provideRouter(APP_ROUTES, withPreloading(PreloadAllModules)),
    ]
})
  .catch(err => console.error(err));
