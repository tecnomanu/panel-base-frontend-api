import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ApiService, UserService} from '../../../../@core/utils';
import {User} from '../../../../@core/models';

@Component({
    selector: 'user-edit',
    styleUrls: ['./pageEdit.scss'],
    templateUrl: './pageEdit.html',
})

@Input()
export class UserEdit {
    user = new User();
    submitted = false;
    messageError = null;
    formValid = true;
    loadingData = true;
    id: null;
    public formUser: FormGroup;

    constructor(private _router: Router,
        private route: ActivatedRoute,
        private apiService: ApiService,
        private userService: UserService,
        public fb: FormBuilder) {
        this.formUser = this.fb.group(this.user.createFb());

        this.route.params.subscribe(params => {
            this.id = params['id'];
            if (this.id)
                this.getData(this.id);
            else
                this._router.navigate(['..']);
        });
    }

    getData(id): any {
        if (this.userService.user._id == this.id){
            this._router.navigate(['/pages/profile']);
        }else{
            this.apiService.getById(id, 'admin/user')
                .subscribe(
                    result => {
                        this.user = new User(result);
                        this.formUser = this.fb.group(this.user.createFb());
                        this.loadingData = false;
                    }, result => {
                        this.messageError = this.apiService.getErrors(result);
                    }
                );
        }
    }

    updateData(options): any {
        this.submitted = true;
        return new Promise((resolve, reject) => {
            this.apiService.update(options, 'user')
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
