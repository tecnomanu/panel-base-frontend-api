import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ThemeModule} from '../../@theme/theme.module';

import {routing} from './companies.routing';
import {Companies} from './companies.component';
import {CompanyTables} from './components/pageTables/table.component';
import {CompanyTablesService} from './components/pageTables/table.service';
import {CompanyForm} from './components/pageForm/pageForm.component';
import {CompanyEdit} from './components/editPage/pageEdit.component';
import {CompanyCreate} from './components/createPage/pageCreate.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ThemeModule,
        routing,
    ],
    declarations: [
        Companies,
        CompanyTables,
        CompanyEdit,
        CompanyCreate,
        CompanyForm
    ],
    providers: [
        CompanyTablesService,
    ],
})
export class CompaniesModule {
}
