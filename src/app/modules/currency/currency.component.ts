import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputSimulatorComponent } from '../../components/input-simulator/input..simulator.component';
import { ReactiveFormDirective } from '../../shared/directives/reactiveForm.directive';
import { CurrencyService } from '../../shared/service/currency-service';
import { ICurrencyExchange } from '../../shared/interface/currency-exchange';
import { HttpClientModule } from '@angular/common/http';
import { DirectivesModule } from '../../shared/directives/directives.module';   
import { Router } from '@angular/router';
 


@Component({
  selector: 'currency',
  standalone : true,
  imports : [
    FormsModule,
    ReactiveFormDirective,
    ReactiveFormsModule,
    InputSimulatorComponent,
    CommonModule,
    DirectivesModule,
    HttpClientModule,  
  ],
  providers: [
    CurrencyService,  
  ], 
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
 
})
export class CurrencyExchangeComponent {

simulatorForm!: FormGroup; 
flgRotate = true; 
TCcompra = 0;
TCventa = 0;   
currentAmount = 0;
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
    private router : Router,
    public currencySrv: CurrencyService,
   
  ) {  
    this.onGetTypeChange(); 
    this.onCreateForm(); 
  }
 
  ngOnInit(){ 
   this.onDetectedChangeAmount();
  }

  onCreateForm(){
    this.simulatorForm = this.fb.group({
      amountLeft: [null, [Validators.min(20), Validators.required]],
      amountRight: [null, [Validators.max(30000), Validators.required]],
    });
  }

  onDetectedChangeAmount(){
    this.amountLeftControl.valueChanges.subscribe((value) => {
      if (value > 0) {
        this.currentAmount = value;
        this.amountLeftValChanges(); 
      }else{
        this.currentAmount = 0;
        this.amountRightControl.setValue(null)
      }
    });
  }
 
 
  onGetTypeChange(): void{ 
    this.currencySrv.onGetCurrencyExchange()
      .subscribe((resp : ICurrencyExchange) => { 
        this.TCcompra = resp.rates['USD'];
        this.TCventa = resp.rates['PEN'];   
        this.isLoading = false 
    });
  }
 
  onRotateIcon() { 
    if(this.currentAmount){
      this.flgRotate = !this.flgRotate; 
      this.amountLeftValChanges(); 
    }  
  }
 
  amountLeftValChanges(): void {
    const amount = this.currentAmount;
    const newAmountRight = this.flgRotate ? amount * this.TCventa : amount * this.TCcompra;
    const currentAmountRight = this.amountRightControl.value;

    const roundedNewAmountRight = (Math.round(newAmountRight * 100) / 100).toFixed(2);

    if (currentAmountRight !== roundedNewAmountRight) { 
      this.amountRightControl.setValue(roundedNewAmountRight, { emitEvent: false });
    }
  }


  onSaveSimulate(){
    const DATA = {
      valuePurchase : this.TCcompra,
      valueSale : this.TCventa,
      amount  : this.amountLeftControl.value,
      amountChange: this.amountRightControl.value, 
      type: (this.flgRotate ? 'VENTA' : 'COMPRA')
    }
    
    const existingDataString = localStorage.getItem('DATA');
    let existingData = existingDataString ? JSON.parse(existingDataString) : []; 
 
    if (!Array.isArray(existingData)) {
        existingData = [];
    }
   
    const newData = [...existingData, DATA]; 
    localStorage.setItem('DATA', JSON.stringify(newData));

  }

 onToGoHistorial(){
   this.router.navigateByUrl('/historial-exchange')
 }
}