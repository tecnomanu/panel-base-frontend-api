/**
 * Own Modules
 */
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgUploaderModule } from 'ngx-uploader';
import { NbMomentDateModule } from '@nebular/moment';
import { NbDateFnsDateModule } from '@nebular/date-fns';

/**
 * System modules
 */
import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    NbActionsModule,
    NbLayoutModule,
    NbMenuModule,
    NbSearchModule,
    NbSidebarModule,
    NbUserModule,
    NbContextMenuModule,
    NbButtonModule,
    NbSelectModule,
    NbIconModule,
    NbThemeModule,
    NbSpinnerModule,
    NbCardModule,
    NbTabsetModule,
    NbCheckboxModule,
    NbPopoverModule,
    NbProgressBarModule,
    NbCalendarModule,
    NbCalendarRangeModule,
    NbStepperModule,
    NbInputModule,
    NbAccordionModule,
    NbDatepickerModule,
    NbDialogModule,
    NbWindowModule,
    NbListModule,
    NbToastrModule,
    NbAlertModule,
    NbRadioModule,
    NbChatModule,
    NbTooltipModule,
    NbCalendarKitModule,
} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {NbSecurityModule} from '@nebular/security';

import {
    FooterComponent,
    HeaderComponent,
    SearchInputComponent,
    TinyMCEComponent,
    CustomModalComponent,
    SearchBox,
    PictureUploader,
    PaginationComponent,
    Select2Component,
    ProductSelectorComponent,
    CheckmarkComponent
} from './components';
import {
    CapitalizePipe,
    PluralPipe,
    RoundPipe,
    TimingPipe,
    NumberWithCommasPipe,
} from './pipes';
import {
    OneColumnLayoutComponent,
    ThreeColumnsLayoutComponent,
    TwoColumnsLayoutComponent,
} from './layouts';
import {WindowModeBlockScrollService} from './services/window-mode-block-scroll.service';
import {DEFAULT_THEME} from './styles/theme.default';
import {COSMIC_THEME} from './styles/theme.cosmic';
import {CORPORATE_THEME} from './styles/theme.corporate';
import {DARK_THEME} from './styles/theme.dark';

const NB_MODULES = [
    NbLayoutModule,
    NbMenuModule,
    NbUserModule,
    NbActionsModule,
    NbSearchModule,
    NbSidebarModule,
    NbContextMenuModule,
    NbSecurityModule,
    NbButtonModule,
    NbSelectModule,
    NbIconModule,
    NbEvaIconsModule,
    NbSpinnerModule,
    NbCardModule,
    NbTabsetModule,
    NbCheckboxModule,
    NbPopoverModule,
    NbProgressBarModule,
    NbCalendarModule,
    NbCalendarRangeModule,
    NbStepperModule,
    NbInputModule,
    NbAccordionModule,
    NbDatepickerModule,
    NbDialogModule,
    NbWindowModule,
    NbListModule,
    NbToastrModule,
    NbAlertModule,
    NbRadioModule,
    NbChatModule,
    NbTooltipModule,
    NbCalendarKitModule,
    NbMomentDateModule,
    NbDateFnsDateModule,
];
const COMPONENTS = [
    HeaderComponent,
    FooterComponent,
    SearchInputComponent,
    TinyMCEComponent,
    OneColumnLayoutComponent,
    ThreeColumnsLayoutComponent,
    TwoColumnsLayoutComponent,

    CustomModalComponent,
    SearchBox,
    PictureUploader,
    PaginationComponent,
    Select2Component,
    ProductSelectorComponent,
    CheckmarkComponent
];
const PIPES = [
    CapitalizePipe,
    PluralPipe,
    RoundPipe,
    TimingPipe,
    NumberWithCommasPipe,
];

const BASE_MODULES = [
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgUploaderModule
];


@NgModule({
    imports: [CommonModule, ...NB_MODULES, ...BASE_MODULES],
    exports: [CommonModule, ...NB_MODULES, ...PIPES, ...COMPONENTS, ...BASE_MODULES],
    declarations: [...COMPONENTS, ...PIPES],
})
export class ThemeModule {
    static forRoot():ModuleWithProviders {
        return <ModuleWithProviders>{
            ngModule: ThemeModule,
            providers: [
                ...NbThemeModule.forRoot(
                    {
                        name: 'default',
                    },
                    [DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME, DARK_THEME],
                ).providers,
                WindowModeBlockScrollService,
            ],
        };
    }
}
