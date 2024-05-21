import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,  } from '@angular/common/http';
import { Observable  } from 'rxjs';
import { environment } from '../../../environment/environment';
 
@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  private AUTH_HEADER = 'Authorization';
  private ID_TOKEN = environment.authorization;

  constructor(
  ) {
  } 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      headers: req.headers
      .set('Content-Type', 'application/json') 
      .set(this.AUTH_HEADER, this.ID_TOKEN)
    });
 
    return next.handle(req)
  }
 



}
