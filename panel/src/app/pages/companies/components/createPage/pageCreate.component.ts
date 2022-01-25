import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ApiService} from '../../../../@core/utils';
import {Company, User} from '../../../../@core/models';

@Component({
    selector: 'company-create',
    styleUrls: ['./pageCreate.scss'],
    templateUrl: './pageCreate.html',
})
export class CompanyCreate {
    company = new Company();
    user = new User();
    submitted = false;
    messageError = null;
    formValid = true;
    id: null;
    public formCompany: FormGroup;
    public formUser: FormGroup;

    constructor(private _router: Router,
        private route: ActivatedRoute,
        private apiService: ApiService,
        public fb: FormBuilder) {
        this.formCompany = this.fb.group(this.company.createFb());
        this.formUser = this.fb.group(this.user.createFb());
    }

    createData(): any {
        const data = this.formCompany.value;
        data['user'] = this.formUser.value;
        this.submitted = true;
        this.apiService.create(data, 'admin/company')
            .subscribe(
                result => {
                    this._router.navigate(['..'], {relativeTo: this.route});
                }, result => {
                    this.messageError = this.apiService.getErrors(result);
                    this.submitted = false;
                }
            );
    }

    changeValidForm($event) {
        this.formValid = $event;
    }

    goBack() {
        this._router.navigate(['..'], {relativeTo: this.route});
    }
}
