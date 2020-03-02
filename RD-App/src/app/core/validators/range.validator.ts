import { AbstractControl } from '@angular/forms';
import { observable } from 'rxjs';

export function rangeValidator (control: AbstractControl) {
  if (control.value !== undefined &&
    (isNaN(control.value) || control.value < 1 || control.value > 600)) {
      return { range: true };
  }
  return observable.of(null);
}
