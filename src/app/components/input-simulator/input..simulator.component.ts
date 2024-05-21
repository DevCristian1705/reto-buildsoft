import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DirectivesModule } from '../../shared/directives/directives.module';
  
@Component({
  selector: 'input-simulator',
  standalone : true,
  imports: [
    CommonModule,
    DirectivesModule
  ],
  templateUrl: './input-simulator.component.html',
  styleUrls: ['./input-simulator.component.scss'],
})
export class InputSimulatorComponent {
 
  @Input() label = 'TIENES';
  @Input() errorMsg='';  
  @Input() isReadOnly = false; 
  @Input() value : string ="50";  
  @Input() typeCurrency = 'Dólares' 
  @Output() public valueChanged = new EventEmitter(); 
 
  onChange(target: any) { 
    this.valueChanged.emit(target.value);
  }
 
}

