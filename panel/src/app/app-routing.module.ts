import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: 'pages', 
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
      path: 'auth',
      loadChildren: () => import('./auth/auth.module')
          .then(m => m.NgxAuthModule),
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
