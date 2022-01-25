/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule, LOCALE_ID} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

//custom own modules //remember add LOCALE_ID
import {APP_BASE_HREF, registerLocaleData} from '@angular/common';
import es from '@angular/common/locales/es';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';

registerLocaleData(es);

const EXPORT_MOD = [
    // FilterPipe
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        CoreModule.forRoot(),
        ThemeModule.forRoot(),
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
