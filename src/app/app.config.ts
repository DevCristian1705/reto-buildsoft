import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './shared/interceptor/token.interceptor'; 
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
 
export const appConfig: ApplicationConfig = { 
   
  providers: [    
    provideRouter(routes),
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
  ]
};
