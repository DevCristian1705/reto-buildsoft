import { ComponentFixture, TestBed } from '@angular/core/testing'; 
import { HistoricalComponent } from './historical.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HistoricalComponent', () => { 
  let component: HistoricalComponent;
  let fixture: ComponentFixture<HistoricalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: []  
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('create component', () => {
    expect(component).toBeTruthy();
  });

  it('initialize arrayHistory from local storage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify([{ data: 'DATALOCAL' }]));
    component.ngOnInit();
    expect(component.arrayHistory).toEqual([{ data: 'DATALOCAL' }]);
  });

  it('navigate to currency-exchange', () => {
    const routerSpy = spyOn((<any>component).router, 'navigateByUrl');
    component.onBack();
    expect(routerSpy).toHaveBeenCalledWith('/currency-exchange');
  });

})
