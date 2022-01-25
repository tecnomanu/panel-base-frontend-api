import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CompanyTablesService} from './table.service';
import {PaginationInstance} from 'ngx-pagination';
import {Observable} from 'rxjs/Observable';
import {ApiService, UserService} from '../../../../@core/utils';
import {CustomModalComponent} from '../../../../@theme/components';

@Component({
    selector: 'Company-tables',
    templateUrl: './table.html',
    styleUrls: ['./table.scss'],
})
export class CompanyTables implements OnInit {
    @ViewChild('deleteModal', {static: false}) deleteModal: CustomModalComponent;

    asyncDataTable: Observable<string[]>;
    loading: boolean = true;
    deleting = false;
    cloning = false;
    options = {
        page: 1,
        per_page: 10,
        q: '',
        order: 'desc',
    };
    public config: PaginationInstance = {
        id: 'table',
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: 0,
    };

    constructor(private service: CompanyTablesService,
        private router: Router, private route: ActivatedRoute,
        private apiService: ApiService,
        public userService: UserService) {
    }

    ngOnInit() {
        this.getPage(1);
    }


    refreshPage(options) {
        this.options = options;
        this.getPage(this.options.page);
    }

    getPage(page: number, search: any = '') {
        this.loading = true;

        this.options.page = page;
        this.options.q = search;

        this.config.currentPage = page;
        this.config.itemsPerPage = this.options.per_page;

        this.asyncDataTable = this.service.getAllCompanies(this.options).then((data) => {
            this.loading = false;
            this.config.totalItems = data.total;
            return data.data;
        });
    }

    editItem(id) {
        this.router.navigate(['edit', {id: id}], {relativeTo: this.route});
    }

    deleteItem(id){
        this.deleting = true;
        this.apiService.delete(id, 'admin/Company')
            .subscribe(
                result => {
                    this.deleteModal.close();
                    this.getPage(this.config.currentPage);
                    this.deleting = false;
                }, result => {
                    this.deleteModal.setError(result);
                    // rest call error
                    this.deleting = false;
                }
            );
    }
}
