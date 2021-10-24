import {FormBuilder, Validators} from '@angular/forms';
//import {EqualPasswordsValidator} from '../../../validators';
export class Product {
    _id: number;
    name: string;
    code: string;
    percentage: string;
    image: string;
    price: string;
    initial_stock: string;
    min_stock: string;
    stock: string;
    config: string;
    provider: string;
    provider_id: string;
    createdAt: string;
    updatedAt: string;
    _fb;
    constructor(obj: any = {}) {
        for (var key in obj) this[key] = obj[key];
    }

    public createFb(){
        this._fb = new FormBuilder();

        let config = {
            cost_type : "percentage"
        };

        return {
            _id: [this._id || ''],
            name: [this.name || '', <any>Validators.required],
            code: [this.code || '', <any>Validators.required],
            percentage: [this.percentage || '', <any>Validators.required],
            min_stock: [this.min_stock || '', <any>Validators.required],
            initial_stock: [this.initial_stock || '', <any>Validators.required],
            stock: [this.stock || ''],
            config: [this.config || config, <any>Validators.required],
            price: [this.price || [], <any>Validators.required],
            image: [this.image || ''],
            provider: [this.provider || ''],
            provider_id: [this.provider_id || '', <any>Validators.required]
        };
    }
}
