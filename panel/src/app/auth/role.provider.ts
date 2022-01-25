import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {NbAuthJWTToken, NbAuthService} from '@nebular/auth';
import {NbRoleProvider} from '@nebular/security';
import {map} from 'rxjs/operators';

@Injectable()
export class NgxRoleProvider implements NbRoleProvider {

    constructor(private authService: NbAuthService) {
    }

    getRole(): Observable<string> {
        return this.authService.onTokenChange()
            .pipe(
                map((token: NbAuthJWTToken) => token.isValid() ? token.getPayload()['role'] : 'Guest'),
            );
    }
}
