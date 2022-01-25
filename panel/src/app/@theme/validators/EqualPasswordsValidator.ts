import {AbstractControl, ValidatorFn} from '@angular/forms';

export function EqualPasswordsValidator(firstField, secondField): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        const validation = {
            passwordsEqual: {
                valid: false,
            },
        };
        return control.parent && control.parent.controls[firstField].value == control.parent.controls[secondField].value ? null : validation;
    };
}
