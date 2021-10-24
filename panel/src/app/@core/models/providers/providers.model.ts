import {FormBuilder, Validators} from '@angular/forms';
//import {EqualPasswordsValidator} from '../../../validators';
export class Provider {
    _id: number;
    name: string;
    brand: string;
    email: string;
    image: string;
    birthday: string;
    config: string;
    company_id: string;
    createdAt: string;
    updatedAt: string;
    _fb;
    constructor(obj: any = {}) {
        for (var key in obj) this[key] = obj[key];
    }

    public createFb(){
        this._fb = new FormBuilder();

        let default_config = {
            alert_stock : false
        };

        let config = this.config ? this.config : default_config;

        if(config['alert_stock'] == "undefined")
            config['alert_stock'] = false;

        return {
            _id: [this._id || ''],
            name: [this.name || '', <any>Validators.required],
            email: [this.email || '', <any>Validators.required],
            brand: [this.brand || '', <any>Validators.required],
            image: [this.image || ''],
            birthday: [ this.birthday ? new Date(this.birthday) : new Date()],
            config: [config],
            company_id: [this.company_id || ''],
        };
    }
}
