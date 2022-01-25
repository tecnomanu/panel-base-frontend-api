import {Routes, RouterModule}  from '@angular/router';

import {Users} from './users.component';
import { UserTables } from './components/pageTables';
import { UserEdit } from './components/editPage';
import { UserCreate } from './components/createPage';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: '',
        component: Users,
        children: [
            {
                path: '',
                component: UserTables,
            },
            {
                path: 'create',
                component: UserCreate,
            },
            {
                path: 'edit',
                component: UserEdit,
            },
            {
                path: 'list', redirectTo: '', pathMatch: 'full',
            },
        ],
    },
];

export const routing = RouterModule.forChild(routes);
