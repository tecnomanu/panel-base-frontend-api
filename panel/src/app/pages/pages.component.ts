import { Component } from '@angular/core';
import { NbTokenService } from '@nebular/auth';
import { UserService } from '../@core/utils';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout *ngIf="userService.logged">
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  constructor(public userService: UserService, protected serviceToken: NbTokenService) {
  }

  ngOnInit() {
    if ( !this.userService.logged)
      this.userService.getUser();
  }
}
