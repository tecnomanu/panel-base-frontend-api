import {Routes, RouterModule}  from '@angular/router';

import {Profile} from './profile.component';
import {ProfileEdit} from './components/editPage';

const routes: Routes = [
    {
        path: '',
        component: Profile,
        children: [
            {
                path: '',
                component: ProfileEdit,
            },
            {
                path: 'edit', redirectTo: '', pathMatch: 'full',
            },
        ],
    },
];

export const routing = RouterModule.forChild(routes);
