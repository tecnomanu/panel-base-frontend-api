import {FormBuilder, Validators} from '@angular/forms';
//import {EqualPasswordsValidator} from '../../../validators';
export class Company {
    id: number;
    name: string;
    owner_id: string;
    membership_id: string;
    credits: string;
    logo: string;
    address: string;
    phone: string;
    url: string;
    email: string;
    membership_payments: string;
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
            owner_id: [this.owner_id || ''],
            membership_id: [this.membership_id || ''],
            credits: [this.credits || ''],
            logo: [this.logo || ''],
            address: [this.address || ''],
            phone: [this.phone || ''],
            url: [this.url || ''],
            email: [this.email || ''],
            membership_payments: [this.membership_payments || ''],
        };
    }
}
