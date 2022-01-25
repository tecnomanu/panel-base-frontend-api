/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {NB_AUTH_OPTIONS, NbAuthResult, NbAuthService} from '@nebular/auth';
//  import { getDeepFromObject } from '../../helpers';

@Component({
    selector: 'ngx-logout',
    templateUrl: './logout.html',
})
export class NgxLogoutComponent implements OnInit {

    redirectDelay: number = 0;
    strategy: string = '';

    constructor(protected service: NbAuthService,
        @Inject(NB_AUTH_OPTIONS) protected options = {},
        protected router: Router) {
        this.redirectDelay = this.options['forms'].login.redirectDelay;
        this.strategy = this.options['forms'].login.strategy;
    }

    ngOnInit(): void {
        this.logout(this.strategy);
    }

    logout(strategy: string): void {
        this.service.logout(strategy).subscribe((result: NbAuthResult) => {

            const redirect = result.getRedirect();
            if (redirect) {
                setTimeout(() => this.router.navigateByUrl(redirect), this.redirectDelay);
            }
        });
    }

    getConfigValue(key: string): any {
    // console.log(NbAuthStrategy.getOption(key));
    // return this.options[key];
        return null; // getDeepFromObject(this.options, key, null);
    }
}
