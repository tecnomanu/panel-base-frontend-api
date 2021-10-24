import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { MENU_ITEMS } from './pages-menu';
import { NbAccessChecker } from '@nebular/security';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;

  constructor(private accessChecker: NbAccessChecker) {
  }

  ngOnInit() {
    this.authMenuItems();
  }

  authMenuItems() {
    this.menu.forEach(item => {
      this.authMenuItem(item);
    });
  }

  authMenuItem(menuItem: NbMenuItem) {
    if(menuItem["data"]){
      this.accessChecker.isGranted(menuItem["data"][0], menuItem["data"][1]).subscribe(granted => {
        menuItem.hidden = !granted;
      });
    }

    if (!menuItem.hidden && menuItem.children != null){
      menuItem.children.forEach(item => {
        if (item.data) {
          this.accessChecker.isGranted(item.data[0], item.data[1]).subscribe(granted => {
            item.hidden = !granted;
          });
        } else {
          item.hidden = menuItem.hidden;
        }
      });
    }
  }
}
