import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import {
    NgxAuthComponent,
    NgxLoginComponent,
    NgxRegisterComponent,
    NgxVerifyComponent,
    NgxLogoutComponent,
    NgxRequestPasswordComponent,
    NgxResetPasswordComponent,
} from './components';

export const routes: Routes = [
    {
        path: '',
        component: NgxAuthComponent,
        children: [
            {
                path: 'login',
                component: NgxLoginComponent,
            },
            {
                path: 'register',
                component: NgxRegisterComponent,
            },
            {
                path: 'verify',
                component: NgxVerifyComponent,
            },
            {
                path: 'verify/:id/:code',
                component: NgxVerifyComponent,
            },
            {
                path: 'logout',
                component: NgxLogoutComponent,
            },
            {
                path: 'request-password',
                component: NgxRequestPasswordComponent,
            },
            {
                path: 'reset-password',
                component: NgxResetPasswordComponent,
            },
            {path: '', redirectTo: 'login', pathMatch: 'full'},
            {path: '**', redirectTo: 'login'},
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NgxAuthRoutingModule {
}
