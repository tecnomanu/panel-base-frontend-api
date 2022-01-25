/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject} from '@angular/core';
import {Router} from '@angular/router';

import {NB_AUTH_OPTIONS, NbAuthResult, NbAuthService} from '@nebular/auth';
import {SITE_CONF} from '../../../@core/core.constants';

declare let confetti: any;

@Component({
    selector: 'ngx-login',
    templateUrl: './login.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxLoginComponent {
    siteConf: any = SITE_CONF;

    redirectDelay: number = 0;
    showMessages: any = {};
    strategy: string = '';
    errors: string[] = [];
    messages: string[] = [];
    user: any = {};
    submitted: boolean = false;
    // socialLinks: NbAuthSocialLink[] = [];
    rememberMe = false;

    logo = 'assets/images/logo.svg';

    constructor(protected service: NbAuthService,
        @Inject(NB_AUTH_OPTIONS) protected options = {},
        protected cd: ChangeDetectorRef,
        private elRef: ElementRef,
        protected _router: Router) {

        this.redirectDelay = this.options['forms'].login.redirectDelay;
        this.showMessages = this.options['forms'].login.showMessages;
        this.strategy = this.options['forms'].login.strategy;
        this.rememberMe = this.options['forms'].login.rememberMe;

        this.service.isAuthenticated().subscribe((authenticated: boolean) => {
            if (authenticated)
                this._router.navigate(['pages']);
        });
    }

    login(): void {
        this.errors = this.messages = [];
        this.submitted = true;

        this.service.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
            this.submitted = false;

            if (result.isSuccess()) {
                this.messages = result.getMessages();
                const response = result.getResponse();

                if (response && response['body'] && response['body']['user']) {
                    localStorage.setItem('user', JSON.stringify(response['body']['user']));
                }

                const redirect = result.getRedirect();
                if (redirect) {
                    setTimeout(() => this._router.navigateByUrl(redirect), this.redirectDelay);
                } else {
                    this._router.navigate(['panel']);
                }
            } else {
                if (result['response'].status === 0) {
                    this.errors = ['Lo sentimos! Hay un problema con nuestros servidores, intentalo mas tarde.'];
                } else {
                    this.errors = result['response'] && result['response'].error &&
                        result['response'].error != 'invalid_credentials' ?
                        result['response'].error : result.getErrors();
                }
            }
            this.cd.detectChanges();
        }, (err) => {
            console.log(err);
        });
    }

    getConfigValue(key: string): any {
    // console.log(NbAuthStrategy.getOption(key));
    // return this.options[key];
        return null; // getDeepFromObject(this.options, key, null);
    }
}
