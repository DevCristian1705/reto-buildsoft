import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';

export enum EInputValidation {
  Number = 'number',
  Alpha = 'alpha',
  Alphanumeric = 'alphanumeric',
  Text = 'text',
  digitsOnly = 'number',
}

@Component({
  selector: 'app-input-library',
  standalone: true,
  imports: [ 
    CommonModule, 
   ],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnChanges {

  @Input() idTextField = 'idTextField';
  @Input() placeholder = ' ';
  @Input() label = 'label';
  @Input() type = 'text';
  @Input() disabled = false;
  @Input() value : string = "";
  @Input() maxLength = '60';
  @Input() size = 'md';
  @Input() paste = true;
  @Input() msgError = ""; 
  @Input() width = '';
  @Input() height = '40px';
  @Input() icon = '';
  @Input() inputValidation!: EInputValidation;
  @Output() public valueChanged = new EventEmitter();
  @Output() public blurred = new EventEmitter();
  @Output() public enter = new EventEmitter();
  @Input() typeInput = "ClassicInput";
  @Input() loading = false;
  @Input() readOnly=false;
  hasError = false;   
  expression!: RegExp; 
  showPassword : boolean = false;  

  flgVerCaracteristicas: boolean = false; 

  isNumber: boolean = false;
  isMayuscula: boolean = false;
  isMinuscula: boolean = false;
  isSimbolo: boolean = false;
  isLength: boolean = false; 

  ejemCaracteres : string = '!@#$%ˆ&*';
  classInput = {
    'text-input': true,
    'error-input': false
  };
 
   
  ngOnChanges(changes: SimpleChanges) {  
    if (this.msgError != "") {   
      this.hasError = true;
      this.classInput['error-input'] = this.hasError;
      this.classInput['text-input'] = !this.hasError;
    } else { 
      this.hasError = false;
      this.classInput['error-input'] = this.hasError;
      this.classInput['text-input'] = !this.hasError;
    }  
  }
 
  onChange(target: any) { 
    this.flgVerCaracteristicas = true;   
    switch (this.inputValidation) {
      case EInputValidation.Number:
        this.expression = /[A-Za-zÑÁÉÍÓÚñáéíóú`~!¡@#$%^&*()_|+\-=?;:'",.<>° ]/g;
        break;
      case EInputValidation.Alpha:
        this.expression = /[0-9`~!¡@#$%^&*()_|+\-=?;:'",.<>° ]/g;
        break;
      case EInputValidation.Alphanumeric:
        this.expression = /[`~!¡@#$%^&*()_|+\-=?;:'",.<>° ]/g;
        break;
      case EInputValidation.Text:
        this.expression = /[0-9`~!¡@#$%^&*()_|+\-=?;:'",.<>°]/g;
        break;
    }

    if (this.expression) {
      target.value = target.value.replace(this.expression, ''); 
    }
    target.value = target.value.substr(0, Number(this.maxLength));  
    this.blurred.emit(target.value); 
    this.valueChanged.emit(target.value);    
   
  }
 
  onFocus(event : any){    
    this.hasError = false;
  }
 
  onBlur(event :any ){ 
    this.hasError = true; 
  }

  onEnter(event: any, value: any) {
    this.enter.emit(value || event.target.value);
  }

  onPaste(event: ClipboardEvent) {
    if ((window as any).clipboardData) {
      const pastedText = (window as any).clipboardData;
    } else {
      const pastedText = event?.clipboardData?.getData('text');
    }
    return this.paste;
  }

  onchangeIconPass(){
    this.showPassword = !this.showPassword
  }
 
}
