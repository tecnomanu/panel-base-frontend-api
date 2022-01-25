import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ApiService} from '../../../../@core/utils';
import {Company} from '../../../../@core/models';

@Component({
    selector: 'company-edit',
    styleUrls: ['./pageEdit.scss'],
    templateUrl: './pageEdit.html',
})

@Input()
export class CompanyEdit {
    company = new Company();
    submitted = false;
    messageError = null;
    formValid = true;
    loadingData = true;
    id: null;
    public formCompany: FormGroup;

    constructor(private _router: Router,
        private route: ActivatedRoute,
        private apiService: ApiService,
        public fb: FormBuilder) {
        this.formCompany = this.fb.group(this.company.createFb());

        const query = this.route.params.subscribe(params => {
            this.id = params['id'];
            if (this.id)
                this.getData(this.id);
            else
                this._router.navigate(['..']);
        });
    }

    getData(id): any {
        this.apiService.getById(id, 'admin/company')
            .subscribe(
                result => {
                    this.company = new Company(result);
                    this.formCompany  = this.fb.group(this.company.createFb());

                    this.loadingData = false;
                }, result => {
                    this.messageError = this.apiService.getErrors(result);
                }
            );
    }

    updateData(options): any {
        this.submitted = true;
        this.apiService.update(options, 'admin/company')
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
