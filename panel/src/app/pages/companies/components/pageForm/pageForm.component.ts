import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserService} from '../../../../@core/utils/users.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import { ApiService } from '../../../../@core/utils';

@Component({
    selector: 'company-form',
    styleUrls: ['./pageForm.scss'],
    templateUrl: './pageForm.html',
})
export class CompanyForm{
    @Input() spinner = false;
    @Output() invalidForm = new EventEmitter<any>();
    @Input('groupCompany') public formCompany: FormGroup;
    @Input('groupUser') public formUser: FormGroup;
    @Input() isCreation = false;
    @Input() myCompany = false;
    testing = false;
    user: any = {};
    test_success = '';
    test_error = '';
    smtp_state = false;

    constructor(private _router: Router,
        public fb: FormBuilder,
        private apiService: ApiService,
        public userService: UserService) {
    }

    getImage() {
        if (!this.formCompany)
            return '';

        const logo = this.formCompany.controls.logo.value;
        return logo ? (logo['base64_image'] ? logo : logo['image']) : '';
    }

    handleChangeImage(file) {
        const avatar = file ? file : '';
        this.formCompany.get('logo').setValue(avatar);
    }

    changeValue(value) {
        if (value == 'password_confirmation')
            this.formUser.controls[value]['match'] = false;
        else
            this.formUser.controls[value]['unquire'] = false;
        this.formUser.controls[value]['error_dns'] = false;
    }

    get username() {
        return this.formUser.get('username');
    }
    get email() {
        return this.formUser.get('email');
    }
    get password() {
        return this.formUser.get('password');
    }
    get password_confirmation() {
        return this.formUser.get('password_confirmation');
    }
    get first_name() {
        return this.formUser.get('first_name');
    }
    get domain_platform() {
        return this.formCompany.get('domain_platform');
    }
}
