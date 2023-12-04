import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { EmailValidator } from '../../../shared/validators/email-validator.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  styles: ``,
})
export class RegisterPageComponent {
  public myForm: FormGroup = this.formBuilder.group({
    name: ['',
      [
        Validators.required,
        Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)
      ]
    ],
    email: ['',
      [Validators.required, Validators.pattern(this.validatorsService.emailPattern)],
      [this.emailValidator]],
    username: ['', [Validators.required, this.validatorsService.uniqueUsername]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  }, {
    validators: [this.validatorsService.areFieldsEqual('password', 'password2')]
  });

  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: ValidatorsService,
    private emailValidator: EmailValidator
  ) {}

  isValidField(field : string) {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }
}
