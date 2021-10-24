import {FormBuilder, Validators} from '@angular/forms';
//import {EqualPasswordsValidator} from '../../../validators';
export class CashBox {
    _id: number;
    name: string;
    type: string;
    initial_value: string;
    total: string;
    createdAt: string;
    updatedAt: string;
    _fb;
    constructor(obj: any = {}) {
        for (var key in obj) this[key] = obj[key];
    }

    public createFb(){
        this._fb = new FormBuilder();

        return {
            _id: [this._id || ''],
            name: [this.name || '', <any>Validators.required],
            type: [this.type || 'cash', <any>Validators.required],
            initial_value: [this.initial_value || 0, <any>Validators.required],
            total: [this.total || 0],
        };
    }
}
