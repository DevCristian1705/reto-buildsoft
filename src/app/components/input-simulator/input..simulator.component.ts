import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
 
export enum EInputValidation {
  Number = 'number',
  Alpha = 'alpha',
  Alphanumeric = 'alphanumeric',
  Text = 'text',
  Decimal='decimal'
}

@Component({
  selector: 'input-simulator',
  standalone : true,
  imports: [
    CommonModule
  ],
  templateUrl: './input-simulator.component.html',
  styleUrls: ['./input-simulator.component.scss'],
})
export class InputSimulatorComponent {
  @Input() idTextField = 'idTextField';
  @Input() placeholder = '';
  @Input() label = 'TIENES';
  @Input() errorMsg='';
  @Input() type = 'text';
  @Input() disabled = false; 
  @Input() isReadOnly = false; 
  @Input() value : string ="50"; 
  @Input() paste = true; 
  @Input() typeCurrency = 'Dólares'
  @Input() inputValidation!: EInputValidation;
  @Output() public valueChanged = new EventEmitter();
  @Output() public enter = new EventEmitter();
  expression!: RegExp;
 

  onChange(target: any) {
    switch (this.inputValidation) {
      case EInputValidation.Number:
        this.expression = /[A-Za-zÑÁÉÍÓÚñáéíóú`~!¡@#$%^&*()_|+\-=?;/:'",.<>° ]/g;
        break;
      case EInputValidation.Text:
        this.expression = /[0-9`~!¡@#$%^&*()_|+\-=?;:'",.<>°]/g;
        break;
    }
    this.valueChanged.emit(target.value);
  }

  onEnter(event: any, value: any) {
    this.enter.emit(value || event.target.value);
  }
}

