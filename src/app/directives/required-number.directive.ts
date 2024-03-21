import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, Validators, ValidatorFn } from '@angular/forms';
import { ValidationErrors } from '@angular/forms';

function validateRequiredNumberFactory() : ValidatorFn {
 return (control: AbstractControl) => {
    let isValid = !isNaN(control.value) && control.value !== null;
    if(isValid) {
      return null; // Devuelve null si el valor es válido
    }
    return { numberIsRequired: true }; // Devuelve un objeto de error si el valor no es válido
 }
}

@Directive({
 selector: '[requiredNumber][ngModel]',
 providers: [{provide: NG_VALIDATORS, useExisting: RequiredNumberValidatorDirective, multi: true}]
})
export class RequiredNumberValidatorDirective implements Validator, OnChanges {
 private valFn = Validators.nullValidator;

 constructor() {
    this.valFn = validateRequiredNumberFactory();
 }

 ngOnChanges(changes: SimpleChanges) {
    // Implementación de ngOnChanges si es necesario
 }

 validate(control: AbstractControl): ValidationErrors | null {
    return this.valFn(control);
 }
}
