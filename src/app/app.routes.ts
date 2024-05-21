import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './modules/auth/auth.component';
import { CurrencyExchangeComponent } from './modules/currency/currency.component';

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
