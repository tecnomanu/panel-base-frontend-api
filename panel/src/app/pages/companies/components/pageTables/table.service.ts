import {Injectable} from '@angular/core';
import {ApiService} from '../../../../@core/utils';

@Injectable()
export class CompanyTablesService {

    CompaniesTableDataPageSize = 10;

    constructor(private apiService: ApiService) {

    }

    getAllCompanies(options): any {
        return new Promise((resolve, reject) => {
            this.apiService.getAll(options, 'admin/company').subscribe(result => resolve(result), result => reject());
        });
    }

    destroyCompany(id): any {
        return new Promise((resolve, reject) => {
            this.apiService.destroy(id, 'admin/company').subscribe(result => resolve(result), result => reject());
        });
    }
}
