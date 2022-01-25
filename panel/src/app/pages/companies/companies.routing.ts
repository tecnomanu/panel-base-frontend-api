import { RouterModule, Routes } from '@angular/router';

import { Companies } from './companies.component';
import { CompanyTables } from './components/pageTables';
import { CompanyCreate } from './components/createPage';
import { CompanyEdit } from './components/editPage';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: '',
        component: Companies,
        children: [{
            path: '',
            component: CompanyTables,
        }, {
            path: 'create',
            component: CompanyCreate,
        }, {
            path: 'edit',
            component: CompanyEdit,
        },
        { path: 'list', redirectTo: '', pathMatch: 'full' },
        ],
    },
];

export const routing = RouterModule.forChild(routes);
