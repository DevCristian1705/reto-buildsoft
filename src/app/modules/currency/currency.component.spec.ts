import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CurrencyService } from '../../shared/service/currency-service';
import { CurrencyExchangeComponent } from './currency.component';
import { of } from 'rxjs';
import { ICurrencyExchange } from '../../shared/interface/currency-exchange';

describe('CurrencyExchangeComponent', () => {
  let component: CurrencyExchangeComponent;
  let fixture: ComponentFixture<CurrencyExchangeComponent>;
  let currencyService: CurrencyService;
  let httpTestingController: HttpTestingController;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      providers: [CurrencyService]
    }).compileComponents();

    currencyService = TestBed.inject(CurrencyService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });
  
  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyExchangeComponent);
    component = fixture.componentInstance;  
    fixture.detectChanges();
  });

  it('create component', () => {
    fixture = TestBed.createComponent(CurrencyExchangeComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    component.ngOnInit();
    component.onGetTypeChange();
    expect(component.simulatorForm).toBeDefined();
  });

  it('create form', () => {
    expect(component.simulatorForm).toBeDefined();
    expect(component.simulatorForm.get('amountLeft')).toBeTruthy();
    expect(component.simulatorForm.get('amountRight')).toBeTruthy();
  });

  

  it('call onGetTypeChange and update TCcompra, TCventa, and isLoading', fakeAsync(() => {
    const mockResponse: ICurrencyExchange = {
      disclaimer: "string",
      license: "string",
      timestamp: 0,
      base: "string",
      rates: { 'PEN': 3.5, 'USD': 1.5 }
    };
  
    spyOn(currencyService, 'onGetCurrencyExchange').and.returnValue(of(mockResponse));
  
    component.onGetTypeChange();
    tick(); 
  
    expect(component.TCcompra).toBe(3.5);
    expect(component.TCventa).toBe(1.5);
    expect(component.isLoading).toBeFalse();
  }));
 
  it('update amountRight when amountLeft changes', () => {
    const amount = 100;
    component.TCventa = 1.5;
    component.flgRotate = true;
    component.simulatorForm.get('amountLeft')?.setValue(amount);
    component.amountLeftValChanges();
    expect(component.amountRightControl.value).toEqual('150.00');
  });

  it('update amountRight correctly when flgRotate is false', () => {
    const amount = 100;
    component.TCcompra = 2.5;
    component.flgRotate = false;
    component.simulatorForm.get('amountLeft')?.setValue(amount);
    component.amountLeftValChanges();
    expect(component.amountRightControl.value).toEqual('250.00');
  });

 
});