import {FormBuilder, Validators} from '@angular/forms';
//import {EqualPasswordsValidator} from '../../../validators';
export class Demo {
    _id: number;
    name: string;
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
        };
    }
}
