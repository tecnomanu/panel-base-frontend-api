import {Injectable} from '@angular/core';
import {ApiService} from '../../../../@core/utils';

@Injectable()
export class UserTablesService {

    usersTableDataPageSize = 10;

    constructor(private apiService: ApiService) {

    }

    getAllUsers(options): any {
        return new Promise((resolve, reject) => {
            this.apiService.getAll(options, 'admin/user').subscribe(result => resolve(result), result => reject());
        });
    }

    destroyUser(id): any {
        return new Promise((resolve, reject) => {
            this.apiService.destroy(id, 'admin/user').subscribe(result => resolve(result), result => reject());
        });
    }
}
