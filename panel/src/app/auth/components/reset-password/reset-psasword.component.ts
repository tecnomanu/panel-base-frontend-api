/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {NB_AUTH_OPTIONS, NbAuthResult, NbAuthService} from '@nebular/auth';

@Component({
    selector: 'ngx-reset-password',
    styleUrls: ['./reset-password.scss'],
    templateUrl: './reset-password.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxResetPasswordComponent {

    redirectDelay: number = 0;
    showMessages: any = {};
    strategy: string = '';

    submitted = false;
    errors: string[] = [];
    messages: string[] = [];
    user: any = {};

    constructor(protected service: NbAuthService,
        @Inject(NB_AUTH_OPTIONS) protected options = {},
        protected cd: ChangeDetectorRef,
        protected router: Router) {

        this.redirectDelay = this.options['forms'].login.redirectDelay;
        this.showMessages = this.options['forms'].login.showMessages;
        this.strategy = this.options['forms'].login.strategy;
    }

    resetPass(): void {
        this.errors = this.messages = [];
        this.submitted = true;

        this.service.resetPassword(this.strategy, this.user).subscribe((result: NbAuthResult) => {
            this.submitted = false;
            const response = result.getResponse();
            if (result.isSuccess()) {
                this.messages = result.getMessages();
            } else if (response && response['error'] && response['error'].length > 0) {
                this.errors = response['error'];
            } else {
                this.errors = result.getErrors();
            }

            const redirect = result.getRedirect();
            if (redirect) {
                setTimeout(() => this.router.navigateByUrl(redirect), this.redirectDelay);
            }
            this.cd.detectChanges();
        });
    }

    getConfigValue(key: string): any {
    // console.log(NbAuthStrategy.getOption(key));
    // return this.options[key];
        return null; // getDeepFromObject(this.options, key, null);
    }
}
