import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './modules/auth/auth.component';
import { CurrencyExchangeComponent } from './modules/currency/currency.component';
import { HistoricalComponent } from './modules/historical/historical.component';

export const routes: Routes = [
    {
        path: 'auth',
        component : AuthComponent
    },
    {
        path: 'currency-exchange',
        component : CurrencyExchangeComponent
    },
    {
        path: 'historial-exchange',
        component : HistoricalComponent
    },
    {
    path: '', redirectTo: 'auth', pathMatch: 'full'
    },
    {
    path: '**', redirectTo: ''
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }
