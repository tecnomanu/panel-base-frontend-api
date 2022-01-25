import {Component, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import { ApiService } from '../../../@core/utils';

@Component({
    selector: 'search-box',
    styleUrls: ['./search-box.scss'],
    templateUrl: './search-box.html',
})
export class SearchBox {
    @Input() show: any = {};
    @Input() baConfPage: any = {
        page: 1,
        per_page: 10,
        q: '',
        order: 'desc',
    };

    @Input() customButton: any = {
        show : false,
        text : '',
        class : '',
    };

    @Output() onCustomButton = new EventEmitter<any>();
    @Output() onOptionChange = new EventEmitter<any>();
    @Output() onChangeValue = new EventEmitter<any>();

    list_per_page: any = [10, 25, 50, 100];
    list_order: any = [{value: 'desc', text: 'Descendente'}, {value: 'asc', text: 'Ascendente'}];
    show_export = false;
    show_order = true;
    show_search = true;
    show_per_page = true;
    msg_error: any;
    msg_success: any;

    constructor(private apiService: ApiService) {}

    ngOnInit() {
        this.show_order = this.show.order != undefined ? this.show.order : true;
        this.show_search = this.show.search != undefined ? this.show.search : true;
        this.show_per_page = this.show.per_page != undefined ? this.show.per_page : true;
    }

    changeOptions(option, value) {
        this.baConfPage[option] = value;
        this.onOptionChange.emit(this.baConfPage);
    }

    customButtonAction() {
        this.onCustomButton.emit();
    }

    searching() {
        this.onChangeValue.emit(this.baConfPage.q);
    }

    getOrderText(value) {
        if (!value)
            value = 'desc';

        for (const order of this.list_order) {
            if (value == order.value)
                return order.text;
        }
    }
}