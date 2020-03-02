import { AbstractControl, ValidatorFn } from '@angular/forms';

export function rangeValidatorParam(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): { range: true } | null => {
    if (control.value !== undefined &&
      (isNaN(control.value) || control.value < min || control.value > max)) {
      return { range: true };
    }
    return null;
  };
}

