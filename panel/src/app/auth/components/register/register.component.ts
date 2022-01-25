/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject} from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';

import {NB_AUTH_OPTIONS, NbAuthResult, NbAuthService} from '@nebular/auth';
import {SITE_CONF} from '../../../@core';

declare let confetti: any;

@Component({
    selector: 'ngx-register',
    templateUrl: './register.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxRegisterComponent {
    siteConf: any = SITE_CONF;

    redirectDelay: number = 0;
    showMessages: any = {};
    strategy: string = '';
    errors: string[] = [];
    messages: string[] = [];
    user: any = {};
    submitted: boolean = false;
    rememberMe = false;

    logo = 'assets/images/logo.svg';

    constructor(protected service: NbAuthService,
        @Inject(NB_AUTH_OPTIONS) protected options = {},
        protected cd: ChangeDetectorRef,
        protected router: Router) {

        this.redirectDelay = this.options['forms'].login.redirectDelay;
        this.showMessages = this.options['forms'].login.showMessages;
        this.strategy = this.options['forms'].login.strategy;
        this.rememberMe = this.options['forms'].login.rememberMe;

        this.service.logout('email').subscribe(result => {
        });
    }

    changeValue(f: NgForm, value) {
        console.log(f, value);
        if (value == 'password_confirmation')
            f.controls[value]['match'] = false;
        else
            f.controls[value]['unquire'] = false;
        f.controls[value]['error_dns'] = false;
    }

    register(f: NgForm): void {
        this.errors = this.messages = [];
        this.submitted = true;

        f.controls.email.setErrors(null);
        f.controls.username.setErrors(null);
        f.controls.password_confirmation.setErrors(null);

        this.service.register(this.strategy, this.user).subscribe((result: NbAuthResult) => {
            this.submitted = false;

            if (result.isSuccess()) {
                this.messages = result.getMessages();
            } else {
                console.log(result['response'].error);
                if (result['response'].error.email){
                    if (result['response'].error.email[0] == 'error_dns_email')
                        f.controls.email.setErrors({ error_dns: true });
                    else if (result['response'].error.email[0] == 'has_ready_taken')
                        f.controls.email.setErrors({ unique: true });
                }

                if (result['response'].error.username)
                    f.controls.username.setErrors({ unique: true });

                if (result['response'].error.password)
                    f.controls.password_confirmation.setErrors({ match: true });

                this.errors = result['response'] && result['response'].error &&
                    result['response'].error != 'invalid_credentials' ?
                    result['response'].error : result.getErrors();
            }

            const response = result.getResponse();
            if (response && response['body'] && response['body']['user'])
                localStorage.setItem('user', JSON.stringify(response['body']['user']));

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
