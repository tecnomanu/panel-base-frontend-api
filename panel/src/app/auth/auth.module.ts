import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxAuthRoutingModule } from './auth-routing.module';
import { NbAuthModule } from '@nebular/auth';
import {
    NbAlertModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbIconModule,
    NbInputModule,
    NbLayoutModule,
} from '@nebular/theme';

import {
    NgxAuthBlockComponent,
    NgxAuthComponent,
    NgxLoginComponent,
    NgxRegisterComponent,
    NgxVerifyComponent,
    NgxLogoutComponent,
    NgxRequestPasswordComponent,
    NgxResetPasswordComponent,
} from './components';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        NbCardModule,
        NbIconModule,
        NbLayoutModule,
        NbAlertModule,
        NbInputModule,
        NbButtonModule,
        NbCheckboxModule,
        NgxAuthRoutingModule,
        NbAuthModule,
    ],
    declarations: [
        NgxAuthBlockComponent,
        NgxAuthComponent,
        NgxLoginComponent,
        NgxRegisterComponent,
        NgxVerifyComponent,
        NgxLogoutComponent,
        NgxRequestPasswordComponent,
        NgxResetPasswordComponent,
    ],
})
export class NgxAuthModule {
}
