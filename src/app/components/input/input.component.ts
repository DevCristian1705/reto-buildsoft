import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
 
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
  @Input() label = 'label';
  @Input() type = 'text';
  @Input() disabled = false;
  @Input() value : string = ""; 
  @Input() msgError = "";   
  @Output() public valueChanged = new EventEmitter();  
  @Input() readOnly=false;
  hasError = false;   
  
  classInput = {
    'text-input': true,
    'error-input': false
  };
  
  ngOnChanges(changes: SimpleChanges) {  
    if (this.msgError != "") {    
      this.classInput['error-input'] = true;
      this.classInput['text-input'] = false;
    } else {  
      this.classInput['error-input'] = false;
      this.classInput['text-input'] = true;
    }  
  }
 
  onChange(target: any) {  
    this.valueChanged.emit(target.value);   
  }
    
}
