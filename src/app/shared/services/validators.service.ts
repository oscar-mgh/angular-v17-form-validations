import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

const usersRegistered = [
  'strider',
  'cartulina3000',
  'gogoeta90',
  'konfleis',
  'michael',
  'franklin',
  'trevor',
  'user1234',
  'stripeuser',
];

@Injectable({ providedIn: 'root' })
export class ValidatorsService {
  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  public uniqueUsername = (control: FormControl): ValidationErrors | null => {
    const value: string = control.value.trim().toLowerCase();

    return usersRegistered.includes(value) ? { userTaken: true } : null;
  };

  public isValidField(form: FormGroup, field: string): boolean | null {
    return form.controls[field].errors && form.controls[field].touched;
  }

  areFieldsEqual(field1: string, field2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const valueField1 = formGroup.get(field1)?.value;
      const valueField2 = formGroup.get(field2)?.value;
      if (valueField1 !== valueField2) {
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { notEqual: true };
      }
      formGroup.get(field2)?.setErrors(null);
      return null;
    };
  }
}
