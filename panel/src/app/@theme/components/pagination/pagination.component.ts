import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PaginationInstance} from 'ngx-pagination';

@Component({
    selector: 'pagination-component',
    styleUrls: ['./pagination.scss'],
    templateUrl: './pagination.html',
})
export class PaginationComponent {
    @Input() config: PaginationInstance = {
        id: 'table',
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: 0,
    };
    @Output() pageChange = new EventEmitter<any>();

    constructor() {
    }
}
