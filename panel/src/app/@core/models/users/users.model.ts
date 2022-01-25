import {FormBuilder, Validators} from '@angular/forms';
import * as moment from 'moment';

import {EqualPasswordsValidator} from '../../../@theme/validators';

export class User {
    _id: number;
    first_name: string;
    last_name: string;
    birthday: Date;
    username: string;
    email: string;
    avatar: string;
    password: string;
    password_confirmation: string;
    capability: any;
    role: string;
    createdAt: string;
    updatedAt: string;
    _fb;

    constructor(obj: any = {}) {
        for (const key in obj) this[key] = obj[key];
    }

    public createFb() {
        this._fb = new FormBuilder();

        return {
            id: [this._id || ''],
            first_name: [this.first_name || '', [<any>Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')] ],
            last_name: [this.last_name || '', [Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')]],
            birthday: [this.birthday ? moment(this.birthday) : false],
            username: [this.username || '', <any>Validators.required],
            password: [this.password || '', Validators.minLength(8)],
            password_confirmation: [this.password_confirmation || '', [<any>EqualPasswordsValidator('password', 'password_confirmation')] ],
            email: [this.email || '', [<any>Validators.required, Validators.pattern('.+@.+..+')]],
            avatar: [this.avatar || ''],
            role: [this.role || ''],
        };
    }
}
