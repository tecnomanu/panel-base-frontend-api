import {FormBuilder, Validators} from '@angular/forms';
//import {EqualPasswordsValidator} from '../../../validators';
export class Local {
    id: number;
    name: string;
    address: string;
    email: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
    _fb;
    constructor(obj: any = {}) {
        for (var key in obj) this[key] = obj[key];
    }

    public createFb(){
        this._fb = new FormBuilder();

        return {
            id: [this.id || ''],
            name: [this.name || '', <any>Validators.required],
            address: [this.address || '', <any>Validators.required],
            email: [this.email || ''],
            phone: [this.phone || ''],
        };
    }
}
