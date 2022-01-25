import { NgModule } from '@angular/core';
import { NbDatepickerModule, NbDialogModule, NbMenuModule, NbSidebarModule, NbToastrModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { ApiService, UserService } from '../@core/utils';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    ECommerceModule,
    MiscellaneousModule,
    NbDatepickerModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDialogModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbToastrModule.forRoot(),
  ],
  declarations: [
    PagesComponent,
  ],
  providers: [
      ApiService,
      UserService,
  ],
})
export class PagesModule {
}
