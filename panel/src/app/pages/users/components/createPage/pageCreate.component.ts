import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ApiService, UserService} from '../../../../@core/utils';
import {User} from '../../../../@core/models';

@Component({
    selector: 'user-create',
    styleUrls: ['./pageCreate.scss'],
    templateUrl: './pageCreate.html',
})
export class UserCreate implements OnInit {
    user = new User();
    submitted = false;
    messageError = null;
    formValid = true;
    id: null;
    public formUser: FormGroup;

    constructor(private _router: Router,
        private route: ActivatedRoute,
        private apiService: ApiService,
        private userService: UserService,
        public fb: FormBuilder) {
    }

    ngOnInit() {
        this.formUser = this.fb.group(this.user.createFb());
        this.formUser.controls.role.setValue(this.userService.hasRole('provider') ? 'provider-user' : 'client-user');

    }

    createData(options): any {
        this.submitted = true;
        return new Promise((resolve, reject) => {
            this.apiService.create(options, 'user')
                .subscribe(
                    result => {
                        resolve(result);
                        this._router.navigate(['..'], {relativeTo: this.route});
                    }, result => {
                        this.messageError = this.apiService.getErrors(result);
                        this.submitted = false;
                    }
                );
        });
    }

    changeValidForm($event) {
        this.formValid = $event;
    }

    goBack() {
        this._router.navigate(['..'], {relativeTo: this.route});
    }
}
