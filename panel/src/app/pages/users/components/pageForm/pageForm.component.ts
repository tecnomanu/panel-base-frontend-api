import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ApiService} from '../../../../@core/utils';
import {UserService} from '../../../../@core/utils/users.service';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
    selector: 'user-form',
    styleUrls: ['./pageForm.scss'],
    templateUrl: './pageForm.html',
})
export class UserForm {
    @Input() spinner = false;
    @Output() invalidForm = new EventEmitter<any>();
    @Input('group')
    public formGroup: FormGroup;
    @Input() isCreation = false;
    user: any = {};

    constructor(private _router: Router,
        public fb: FormBuilder,
        public userService: UserService) {
    }

    getImage() {
        if (!this.formGroup)
            return '';

        const logo = this.formGroup.controls.logo.value;
        return logo ? (logo['base64_image'] ? logo : logo['image']) : '';
    }

    changeValue(value) {
        if (value == 'password_confirmation')
            this.formGroup.controls[value]['match'] = false;
        else
            this.formGroup.controls[value]['unquire'] = false;
        this.formGroup.controls[value]['error_dns'] = false;
    }

    userEditingRole(){
        const role = this.formGroup.controls['role'].value;
        if (this.userService.hasRole('client'))
            return role.indexOf('client') ? true : false;
        return true;
    }

    get username() {
        return this.formGroup.get('username');
    }
    get email() {
        return this.formGroup.get('email');
    }
    get password() {
        return this.formGroup.get('password');
    }
    get password_confirmation() {
        return this.formGroup.get('password_confirmation');
    }
    get first_name() {
        return this.formGroup.get('first_name');
    }
    get last_name() {
        return this.formGroup.get('last_name');
    }
    get birthday() {
        return this.formGroup.get('birthday');
    }
}
