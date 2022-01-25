/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {Component, OnDestroy} from '@angular/core';
import {Location} from '@angular/common';

import {NbAuthService} from '@nebular/auth'; // '../services/auth.service';
import {takeWhile} from 'rxjs/operators';
import {SITE_CONF} from '../../@core';
import { Router } from '@angular/router';

@Component({
    selector: 'ngx-auth',
    styleUrls: ['./auth.component.scss'],
    template: `
      <nb-layout>
          <nb-layout-column>
              <nb-card>
                  <nb-card-body>
                      <div id="logo">
                          <img [src]="logo" alt="{{siteConf.companyName}} - Logo" class="flex-centered">
                      </div>
                      <div class="flex-centered col-xl-4 col-lg-6 col-md-8 col-sm-12">
                          <router-outlet></router-outlet>
                      </div>
                      <div class="pt-5 text-center">
                          <small class="form-text"><b><a [href]="siteConf.companyWebsite"
                                                         target="_blank">{{siteConf.companyName}}</a></b> 2021<br/>Todos
                              los derechos reservados.</small>
                      </div>
                  </nb-card-body>
              </nb-card>
          </nb-layout-column>
      </nb-layout>
  `,
})
export class NgxAuthComponent implements OnDestroy {
    siteConf: any = SITE_CONF;

    private alive = true;

    subscription: any;

    authenticated: boolean = false;
    token: string = '';
    logo = 'assets/images/logo.png';

    // showcase of how to use the onAuthenticationChange method
    constructor(protected auth: NbAuthService,
        protected location: Location,
        protected _router: Router) {
        this.subscription = auth.onAuthenticationChange()
            .pipe(takeWhile(() => this.alive))
            .subscribe((authenticated: boolean) => {
                this.authenticated = authenticated;
            });
    }

    ngOnDestroy(): void {
        this.alive = false;
    }
}
