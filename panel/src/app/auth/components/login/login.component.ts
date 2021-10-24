/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { NbAuthService, NbAuthResult, NB_AUTH_OPTIONS} from '@nebular/auth';
import { SITE_CONF } from '../../../@core/core.constants';

declare var confetti: any;

@Component({
    selector: 'ngx-login',
    templateUrl: './login.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxLoginComponent {
    siteConf:any=SITE_CONF;
    
    redirectDelay: number = 0;
    showMessages: any = {};
    strategy: string = '';
    errors: string[] = [];
    messages: string[] = [];
    user: any = {};
    submitted: boolean = false;
    //socialLinks: NbAuthSocialLink[] = [];
    rememberMe = false;

    logo= "assets/images/logo.png";

    constructor(protected service: NbAuthService,
                @Inject(NB_AUTH_OPTIONS) protected options = {},
                protected cd: ChangeDetectorRef,
                private elRef:ElementRef,
                protected router: Router) {

        this.redirectDelay = this.options['forms'].login.redirectDelay;
        this.showMessages = this.options['forms'].login.showMessages;
        this.strategy = this.options['forms'].login.strategy;
        this.rememberMe = this.options['forms'].login.rememberMe;

        this.service.logout('email').subscribe(result=>{});

        //Activate if need confeti on logo to celebrate any date
        // let date = new Date();
        // if(date.getMonth() == 6){
        //     this.logo = "assets/images/logo_happy_birthday.png";
        //     console.log("Feliz Cumple!!!");
        //     setTimeout(()=>{
        //         let button =  this.elRef['nativeElement'].querySelector('#logo');
        //         if(button){
        //             console.log(button);
        //             confetti(button, {angle: 90, spread: 180, startVelocity: 70, elementCount: 50, decay: 0.75, colors: ['#E68F17', '#FAB005', '#FA5252', '#E64980', '#BE4BDB', '#0B7285', '#15AABF', '#EE1233', '#40C057']});
        //         }
        //     }, 300);
        // }
    }

    login(): void {
        this.errors = this.messages = [];
        this.submitted = true;

        this.service.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
            this.submitted = false;

            if (result.isSuccess()) {
                this.messages = result.getMessages();
            } else {
                this.errors = result["response"] && result["response"].error && result["response"].error != 'invalid_credentials' ? result["response"].error : result.getErrors();
            }

            let response = result.getResponse();
            if(response && response['body'] && response['body']['user'])
                localStorage.setItem("user", JSON.stringify(response['body']['user']));

            const redirect = result.getRedirect();
            if (redirect) {
                setTimeout(() => {
                    return this.router.navigateByUrl(redirect);
                }, this.redirectDelay);
            }
            this.cd.detectChanges();
        });
    }

    getConfigValue(key: string): any {
        //console.log(NbAuthStrategy.getOption(key));
        //return this.options[key];
        return null; //getDeepFromObject(this.options, key, null);
    }
}
