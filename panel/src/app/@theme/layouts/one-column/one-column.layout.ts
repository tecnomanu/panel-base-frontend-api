import { Component, ViewChild } from '@angular/core';
import { NbIconLibraries, NbLayoutComponent, NbMediaBreakpointsService, NbMenuItem, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { NbAccessChecker } from '@nebular/security';
import { MENU_ITEMS } from '../../../pages/pages-menu';

@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
    <nb-layout windowMode>
      <nb-layout-header fixed>
        <ngx-header></ngx-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive>
        <nb-menu [items]="menuNav"></nb-menu>
      </nb-sidebar>

      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <ngx-footer></ngx-footer>
      </nb-layout-footer>
    </nb-layout>
  `,
})
export class OneColumnLayoutComponent {

  menuNav: NbMenuItem[] = MENU_ITEMS;

  constructor(protected menuService: NbMenuService,
    protected themeService: NbThemeService,
    protected bpService: NbMediaBreakpointsService,
    protected sidebarService: NbSidebarService,
    private iconLibraries: NbIconLibraries,
  ) { 

    this.iconLibraries.registerFontPack('nebular', {iconClassPrefix: 'nb'});
    this.iconLibraries.registerFontPack('awesome', {iconClassPrefix: 'fa'});
    this.iconLibraries.registerFontPack('ion', {iconClassPrefix: 'ion'});
    
    // this.menuNav.forEach(item => {
    //   this.authMenuItem(item);
    // });
  }

  // authMenuItem(menuItem: NbMenuItem) {
  //   if (menuItem['data']) {
  //     this.accessChecker.isGranted(menuItem['data'][0], menuItem['data'][1]).subscribe(granted => {
  //       menuItem.hidden = !granted;
  //     });
  //   }

  //   if (!menuItem.hidden && menuItem.children != null) {
  //     menuItem.children.forEach(item => {
  //       if (item.data) {
  //         this.accessChecker.isGranted(item.data[0], item.data[1]).subscribe(granted => {
  //           item.hidden = !granted;
  //         });
  //       } else {
  //         item.hidden = menuItem.hidden;
  //       }
  //     });
  //   }
  // }
}
