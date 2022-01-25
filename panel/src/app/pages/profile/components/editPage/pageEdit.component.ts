import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ApiService, UserService} from '../../../../@core/utils';
import {User} from '../../../../@core/models';

@Component({
    selector: 'profile-edit',
    styleUrls: ['./pageEdit.scss'],
    templateUrl: './pageEdit.html',
})

@Input()
export class ProfileEdit implements OnInit {
    public formUser: FormGroup;
    user = new User();
    submitted = false;
    messageError = null;
    loadingData = true;
    formValid = true;
    id: null;

    constructor(private _router: Router,
        private route: ActivatedRoute,
        private apiService: ApiService,
        private userService: UserService,
        public fb: FormBuilder) {
        this.formUser = this.fb.group(this.user.createFb());
    }

    ngOnInit() {
        this.getData();
    }

    getData(): any {
        this.apiService.getAll({}, 'me/data')
            .subscribe(
                result => {
                    this.user = new User(result);
                    this.formUser = this.fb.group(this.user.createFb());
                    this.loadingData = false;
                }, result => {
                    this.messageError = this.apiService.getErrors(result);
                },
            );
    }

    updateData(options): any {
        this.submitted = true;
        if (options['password'] == '')
            delete options['password'];

        return new Promise((resolve, reject) => {
            this.apiService.update(options, 'admin/user')
                .subscribe(
                    result => {
                        resolve(result);
                        this.userService.getUser();
                        this._router.navigate(['..'], {relativeTo: this.route});
                    }, result => {
                        this.messageError = this.apiService.getErrors(result);
                        this.submitted = false;
                    },
                );
        });
    }

    getImage() {
        if (!this.formUser)
            return '';

        const avatar = this.formUser.controls.avatar.value;
        return avatar ? (avatar['base64_image'] ? avatar : avatar['image']) : '';
    }

    handleChangeImage(file) {
        const avatar = file ? file : '';
        this.formUser.get('avatar').setValue(avatar);
    }

    changeValidForm($event) {
        this.formValid = $event;
    }

    goBack() {
        this._router.navigate(['..'], {relativeTo: this.route});
    }
}
