import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './shared/interceptor/token.interceptor';
import { OnlyNumbersDirective } from './shared/directives/only-numbers';
 
export const appConfig: ApplicationConfig = { 
 
  providers: [  
    OnlyNumbersDirective,
    provideRouter(routes),
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
  ]
};
