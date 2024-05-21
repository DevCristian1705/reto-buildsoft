import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormDirective } from '../../shared/directives/reactiveForm.directive';
import { InputComponent } from '../../components/input/input.component';
 
@Component({
  selector: 'app-auth',
  standalone: true,
  imports : [
    InputComponent, 
    ReactiveFormDirective, 
    ReactiveFormsModule, 
    CommonModule, 
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent  {

  loginForm!: FormGroup; 
  
  constructor( 
    public fb: FormBuilder,   
  ) {
    const patronCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(patronCorreo)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
   }

     
  get frmEmailControl(): FormControl { return this.loginForm.get("email") as FormControl;  }
  get frmPassControl(): FormControl { return this.loginForm.get("password") as FormControl;  }

  get getErrorEmail(): string { 
    if (this.frmEmailControl.invalid && this.frmEmailControl.touched) {
      if (this.frmEmailControl.hasError('required')) { return 'Ingresa un correo electrónico.'}
      if (this.frmEmailControl.hasError('pattern')) { return 'Ingresa un correo electrónico correcto.'}
      if (this.frmEmailControl.hasError('customErrorEmail')) { return this.frmEmailControl?.errors?.['customErrorEmail']}
    }
    return '';
  }

  get getErrorPass(): string {
    if (this.frmPassControl.invalid && this.frmPassControl.touched) {
      if (this.frmPassControl.hasError('required')) { return 'Ingresa una contraseña'}
      if (this.frmPassControl.hasError('customErrorPass')) { return this.frmPassControl?.errors?.['customErrorPass']}
    }
    return '';
  }

 
}
