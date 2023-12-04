import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  standalone: true,
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
  styles: ``,
})
export class DynamicPageComponent {
  public myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.formBuilder.array([
      ['The Witcher', Validators.required],
      ['Halo Reach', Validators.required],
      ['Batman Arkham Knight', Validators.required],
    ]),
  });

  public newFavorite: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  constructor(private formBuilder: FormBuilder) {}

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  isValidField(field: string): boolean | null {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }

  getErrorMessage(field: string): string | null {
    if (!this.myForm.controls[field]) return null;
    const errors = this.myForm.controls[field].errors || {};
    for (const error of Object.keys(errors)) {
      switch (error) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Se requieren ${errors['minlength'].requiredLength} caracteres minimo`;
      }
    }
    return null;
  }

  isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  addToFavorite(): void {
    if (!this.newFavorite.valid) return;
    const newGame = this.newFavorite.value;
    this.favoriteGames.push(
      this.formBuilder.control(newGame, Validators.required)
    );
    this.newFavorite.reset();
  }

  onDeleteFavorite(index: number) {
    this.favoriteGames.removeAt(index);
  }

  onSubmit(): void {
    if (!this.myForm.valid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    (this.myForm.controls['favoriteGames'] as FormArray) =
      this.formBuilder.array([]);
    this.myForm.reset();
  }
}
