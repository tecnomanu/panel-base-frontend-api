import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { AuthGuard } from '../@core/interceptors';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: ECommerceComponent,
    },
    {
      path: 'companies',
      loadChildren: () => import('./companies/companies.module')
        .then(m => m.CompaniesModule),
      canActivate: [AuthGuard],
    },
    {
      path: 'users',
      loadChildren: () => import('./users/users.module')
        .then(m => m.UsersModule),
      canActivate: [AuthGuard],
    },
    {
      path: 'profile',
      loadChildren: () => import('./profile/profile.module')
        .then(m => m.ProfileModule),
      canActivate: [AuthGuard],
    },
    {
      path: '',
      redirectTo: 'dashboard',//'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
