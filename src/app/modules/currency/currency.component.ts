import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputSimulatorComponent } from '../../components/input-simulator/input..simulator.component';
import { ReactiveFormDirective } from '../../directives/reactiveForm.directive';
import { CurrencyService } from '../../service/currency-service';
import { ICurrencyExchange } from '../../interface/currency-exchange';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'currency',
  standalone : true,
  imports : [
    FormsModule,
    ReactiveFormDirective,
    ReactiveFormsModule,
    InputSimulatorComponent,
    CommonModule,
    HttpClientModule
  ],
  providers: [
    CurrencyService
  ],
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
})
export class CurrencyExchangeComponent {

simulatorForm!: FormGroup; 
flgRotate = true; 
montoaCambiar = 0;
TCcompra = 0;
TCventa = 0;   
isLoading : boolean = true;
 
get amountLeftControl(): FormControl {
    return this.simulatorForm.get("amountLeft") as FormControl;
  }
get amountRightControl(): FormControl {
return this.simulatorForm.get("amountRight") as FormControl;
}
 
get amountLeftError(): string {
    if (this.amountLeftControl.hasError('required') || this.amountLeftControl.hasError('min')) {
        this.amountLeftControl.markAsTouched
        return 'Monto mínimo $20';
    }
    return '';
}

constructor(
    public fb: FormBuilder,
    public currencySrv: CurrencyService,
  ) {  
    this.onGetTypeChange(); 
    this.onCreateForm();

    this.amountLeftControl.valueChanges.subscribe((value) => {
      if (value > 0) {
        this.montoaCambiar = value;
        this.amountLeftValChanges(); 
      }else{
        this.amountRightControl.setValue(null)
      }
    });
  }
 

  onCreateForm(){
    this.simulatorForm = this.fb.group({
      amountLeft: [null, [Validators.min(20), Validators.required]],
      amountRight: [null, [Validators.max(30000), Validators.required]],
    });
  }

  onGetTypeChange(){ 
    this.currencySrv.onGetCurrencyExchange()
    .subscribe((resp : ICurrencyExchange) => {
        if (resp) {
          this.isLoading = false
          this.TCcompra = resp.rates['PEN'];
          this.TCventa = resp.rates['USD'];   
        }
    });
  }
 
  onRotateIcon() { 
    this.flgRotate = !this.flgRotate; 
    this.amountLeftValChanges(); 
  }


  amountLeftValChanges(): void {
    const amount = this.montoaCambiar;
    const amountRight = this.flgRotate == true 
    ? amount * this.TCventa 
    : amount * this.TCcompra;

    if (amountRight) {
      this.amountRightControl.setValue((Math.round(amountRight * 100) / 100).toFixed(2));
    }

  }

}