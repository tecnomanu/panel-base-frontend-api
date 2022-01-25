import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ThemeModule} from '../../@theme/theme.module';

import {routing} from './profile.routing';
import {Profile} from './profile.component';
import {ProfileEdit} from './components/editPage';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ThemeModule,
        routing,
    ],
    declarations: [
        Profile,
        ProfileEdit,
    ],
    providers: [

    ],
})
export class ProfileModule {
}
