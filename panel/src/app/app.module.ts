/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule, LOCALE_ID} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from './@core/core.module';
import {ThemeModule} from './@theme/theme.module';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {
    NbChatModule,
    NbDatepickerModule,
    NbDialogModule,
    NbMenuModule,
    NbSidebarModule,
    NbToastrModule,
    NbWindowModule,
} from '@nebular/theme';

//custom own modules //remember add LOCALE_ID
import {APP_BASE_HREF, registerLocaleData} from '@angular/common';
import es from '@angular/common/locales/es';
registerLocaleData(es);

import { ModalModule, TooltipModule, PopoverModule, BsDropdownModule } from 'ngx-bootstrap';
import { NgxMaskModule, IConfig } from 'ngx-mask';

//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export const optionsNgxMask:Partial<IConfig> | (() => Partial<IConfig>) = {};
const IMPORT_MOD = [
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgxMaskModule.forRoot(optionsNgxMask),
];
const EXPORT_MOD = [
    ModalModule,
    TooltipModule,
    PopoverModule,
    BsDropdownModule,
    NgxMaskModule
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,

        ThemeModule.forRoot(),

        NbSidebarModule.forRoot(),
        NbMenuModule.forRoot(),
        NbDatepickerModule.forRoot(),
        NbDialogModule.forRoot(),
        NbWindowModule.forRoot(),
        NbToastrModule.forRoot(),
        NbChatModule.forRoot({
            messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
        }),
        CoreModule.forRoot(),
        ...IMPORT_MOD
    ],
    exports: [
        ...EXPORT_MOD
    ],
    bootstrap: [AppComponent],
    providers: [
        {provide: LOCALE_ID, useValue: 'es'},
        {provide: APP_BASE_HREF, useValue: '/'},
    ]
})
export class AppModule {
}
