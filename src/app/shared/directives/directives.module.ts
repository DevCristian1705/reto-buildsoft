import { NgModule } from '@angular/core';
import { OnlyNumbersDirective } from './only-numbers';
 

@NgModule({ 
  declarations: [OnlyNumbersDirective],
  exports: [OnlyNumbersDirective]
})
export class DirectivesModule {}