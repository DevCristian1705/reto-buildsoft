import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ICurrencyExchange } from '../interface/currency-exchange';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
 
  private API: string = environment.api_url;

  constructor(  
    private http: HttpClient
  ) {
     
  }

  onGetCurrencyExchange(): Observable<ICurrencyExchange>{
    return this.http.get<ICurrencyExchange>(`${this.API}`);        
  }
 

}
