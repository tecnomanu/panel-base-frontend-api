/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { HttpClient } from '@angular/common/http';
import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';

import {SITE_CONF, SITE_URL} from '../../../@core/core.constants';

declare let confetti: any;

@Component({
    selector: 'ngx-verify',
    templateUrl: './verify.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxVerifyComponent {
    base_version = 'api/v1/';
    apiUrl = SITE_URL;

    siteConf: any = SITE_CONF;

    redirectDelay: number = 2000;
    showMessages: any = {};
    errors: string[] = [];
    messages: string[] = [];
    submitted: boolean = false;
    rememberMe = false;

    verification_code: string = '';
    id: string = null;

    logo = 'assets/images/logo.svg';

    constructor(private http: HttpClient,
        protected cd: ChangeDetectorRef,
        private route: ActivatedRoute,
        private _sanitizer: DomSanitizer,
        protected _router: Router) {
        this.route.params.subscribe(params => {
            this.verification_code = params['code'];
            this.id = params['id'];
            if (this.id && this.verification_code) {
                this.verify();
            }
        });
    }

    verify(): void {
        this.errors = this.messages = [];
        this.submitted = true;

        this.verification_code = this._sanitizer.sanitize(0, this.verification_code);
        const params = {'code': this.verification_code, 'id' : this.id};
        const url = SITE_URL + this.base_version + 'auth/verify';
        this.http.post(url, params).subscribe( (result) => {
            this.submitted = false;
            if (result['status'] === 'valid') {
                this.messages = ['Tu usuario fue validado correctamente!'];
                setTimeout(() => this._router.navigate(['/panel']), this.redirectDelay);
            }
            this.cd.detectChanges();
        }, (err) => {
            this.submitted = false;
            const status = err.status;
            let error = ['Hay un error con la verificación, intentelo de nuevo.'];
            if (status == 403)
                error = ['El codigo ingresado es invalido.'];
            else
                console.log(err);

            this.errors = error;
            this.cd.detectChanges();
        });
    }

    sendNewCode() {
        this.errors = this.messages = [];
        this.submitted = true;
        this.http.get(SITE_URL + this.base_version + 'auth/verify/send').subscribe( (result) => {
            this.submitted = false;
            if (result['status'] === 'sent') {
                this.messages = ['Un nuevo codigo ha sido enviado a su correo electronico.'];
                setTimeout(() => this.errors = this.messages = [], this.redirectDelay);
            }
            this.cd.detectChanges();
        }, (err) => {
            this.submitted = false;
            this.errors = ['Ocurrio un error, intentelo de nuevo.'];
            setTimeout(() => this.errors = this.messages = [], this.redirectDelay);
            this.cd.detectChanges();
        });
    }
}
