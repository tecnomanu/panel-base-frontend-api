/**
 * Own Modules
 */
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxUploaderModule } from 'ngx-uploader';
import { NbMomentDateModule } from '@nebular/moment';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import {IConfig, NgxMaskModule} from 'ngx-mask';
import { NgxEchartsModule } from 'ngx-echarts';
import {SortablejsModule} from 'ngx-sortablejs';
import {ImageCropperModule} from 'ngx-image-cropper';

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
    NbFormFieldModule,
} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {NbSecurityModule} from '@nebular/security';

import {NumericDirective} from './directives';

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
import {DEFAULT_THEME} from './styles/theme.default';
import {COSMIC_THEME} from './styles/theme.cosmic';
import {CORPORATE_THEME} from './styles/theme.corporate';
import {DARK_THEME} from './styles/theme.dark';

import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
};

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
    NbFormFieldModule,
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
    CheckmarkComponent
];

import {ColorCompactModule} from 'ngx-color/compact';
import {ColorCircleModule} from 'ngx-color/circle';
import {ColorAlphaModule} from 'ngx-color/alpha';
import {ColorHueModule} from 'ngx-color/hue';
import {ColorShadeModule} from 'ngx-color/shade';
export const optionsNgxMask: Partial<IConfig> | (() => Partial<IConfig>) = {};
const ngxColor = [
    ColorCompactModule,
    ColorCircleModule,
    ColorAlphaModule,
    ColorHueModule,
    ColorShadeModule,
];

const IMPORT_MOD = [
    PerfectScrollbarModule,
    NgxMaskModule.forRoot(optionsNgxMask),
    SortablejsModule.forRoot({animation: 150}),
    ImageCropperModule,
    ...ngxColor,
];

const EXPORT_MOD = [
    NgxMaskModule,
    SortablejsModule,
    //NgxEchartsModule,
    ...ngxColor,
];

const DIRECTIVES = [
    NumericDirective,
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
    NgxUploaderModule
];

const LAYOUTS = [
    OneColumnLayoutComponent,
    ThreeColumnsLayoutComponent,
    TwoColumnsLayoutComponent,
];


const ENTRY_COMPONENTS = [];

@NgModule({
    imports: [CommonModule, ...NB_MODULES, ...IMPORT_MOD, ...BASE_MODULES],
    exports: [CommonModule, ...NB_MODULES, ...EXPORT_MOD, ...BASE_MODULES, ...PIPES, ...COMPONENTS, ...DIRECTIVES],
    declarations: [...COMPONENTS, ...LAYOUTS, ...PIPES, ...DIRECTIVES],
    entryComponents: [...ENTRY_COMPONENTS],
})
export class ThemeModule {
    static forRoot(): ModuleWithProviders<ThemeModule> {
        return {
            ngModule: ThemeModule,
            providers: [
                {provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG},
                ...NbThemeModule.forRoot(
                    {
                        name: 'default',
                    },
                    [DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME, DARK_THEME],
                ).providers,
            ],
        };
    }
}
