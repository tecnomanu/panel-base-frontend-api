import {Component, ViewChild, ElementRef, Input, Output, EventEmitter} from '@angular/core';
import {ApiService} from '../../../@core/utils';

import 'style-loader!./product-selector.scss';

@Component({
    selector: 'product-selector-component',
    templateUrl: './product-selector.html',
})
export class ProductSelectorComponent {
    @ViewChild('CodeInput', {static: false}) CodeInput: ElementRef;
    @ViewChild('PriceInput', {static: false}) PriceInput: ElementRef;
    @ViewChild('QtyInput', {static: false}) QtyInput: ElementRef;

    @Input() selectId: string = 'selectproduct';
    @Output() productSelected = new EventEmitter<any>();
    
    newSaleItem:any={
        "code" : "",
        "prod" : "",
        "price" : "",
        "qty" : "",
    };

    findError="";
    clearNewSaleItem=false;
    loadingSale=false;

    constructor(private _elementRef: ElementRef, public apiService: ApiService) {
    }

    ngOnInit(){
        setTimeout(()=>{
            this.CodeInput['nativeElement'].focus();
        },100);
    }

    findStock(code):any {
        return new Promise((resolve, reject) => {
            this.apiService.getById(code, 'prodByCode').subscribe(result =>resolve(result), err => reject(err));
        });
    }

    findProd(){
        this.findError = "";
        this.findStock(this.newSaleItem.code).then((data) => {
            if(data._id){
                this.newSaleItem.prod = data;
                this.newSaleItem.code = data.code;
                this.newSaleItem.price = data.price;
                this.PriceInput['nativeElement'].focus();
            }
        }, (err) => {
            this.findError = err.error.error;
        });
    }

    changeToPriceInput(){
        this.PriceInput['nativeElement'].focus()
    }

    changeToQtyInput(){
        this.QtyInput['nativeElement'].focus()
    }

    addNewItem(){
        this.findError = "";
        if(this.newSaleItem.prod && this.newSaleItem.prod._id && this.newSaleItem.qty >= 1 && Number(this.newSaleItem.qty) && Number(this.newSaleItem.price)){
            this.productSelected.emit(JSON.parse( JSON.stringify(this.newSaleItem) ));
            this.newSaleItem ={
                "code" : "",
                "prod" : "",
                "price" : "",
                "qty" : "",
            };
            this.clearNewSaleItem = true;
            setTimeout(()=>this.clearNewSaleItem = false, 100);
            this.CodeInput['nativeElement'].focus();
        }else if(!Number(this.newSaleItem.price)){
            this.findError = "El precio no es un numero valido";
        }else if(!Number(this.newSaleItem.qty)){
            this.findError = "La cantidad no es un numero valido";
        }
    }

}
