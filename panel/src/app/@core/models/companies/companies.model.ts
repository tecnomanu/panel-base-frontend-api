import {FormBuilder, Validators} from '@angular/forms';
//import {EqualPasswordsValidator} from '../../../validators';
export class Company {
    _id: number;
    name: string;
    owner_id: string;
    credits: string;
    logo: string;
    address: string;
    phone: string;
    url: string;
    cuit: string;
    email: string;
    membership_id: string;
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
            id: [this._id || ''],
            name: [this.name || '', <any>Validators.required],
            owner_id: [this.owner_id || ''],
            credits: [this.credits || ''],
            logo: [this.logo || ''],
            address: [this.address || ''],
            phone: [this.phone || ''],
            url: [this.url || ''],
            cuit: [this.cuit || ''],
            email: [this.email || ''],
            membership_id: [this.membership_id || ''],
            membership_payments: [this.membership_payments || ''],
        };
    }
}
