import {
  NG_VALIDATORS,
  FormControl,
  ValidatorFn,
  Validator
} from '@angular/forms';

import { Directive } from '@angular/core';
import { validateRut } from '../shared/utilities';

@Directive({
  selector: '[rutvalidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: RutvalidatorDirective,
    multi: true
  }]
})
export class RutvalidatorDirective  implements Validator {

  validator: ValidatorFn;

  constructor() {
    this.validator = this.rutValidator();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }

  rutValidator(): ValidatorFn {
    // @ts-ignore
    return (c: FormControl) => {
      let isValid = validateRut(c.value);
      if (isValid) {
        return null;
      } else {
        return {
          rutvalidator: {
            valid: isValid
          }
        };
      }
    };
  }

}
