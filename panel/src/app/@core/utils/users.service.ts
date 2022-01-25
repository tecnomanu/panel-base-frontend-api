import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {NbAuthJWTToken, NbAuthService, NbTokenService} from '@nebular/auth';
import {Router} from '@angular/router';
import { Subject } from 'rxjs';
import {IMAGES_ROOT, SITE_CONF} from '../core.constants';

@Injectable()
export class UserService {

    protected change$ = new Subject();
    logged = false;
    user: any = null;
    token: any = null;
    tokenValid = false;
    private userArray: any[];

    constructor(private apiService: ApiService,
        private tokenService: NbTokenService,
        private authService: NbAuthService,
        protected _router: Router) {
        this.setUser();
        this.authService.onTokenChange()
            .subscribe((token: NbAuthJWTToken) => {
                this.logged = token.isValid();
                this.tokenValid = token.isValid();
            });
    }

    getUser() {
        this.token = this.tokenService.get().subscribe((token_result) => {
            this.apiService.getUser().subscribe(result => {
                this.user = result;
                this.change$.next(result);
                localStorage.setItem('user', JSON.stringify(result));
                this.logged = true;
            }, error => {
                if (error.status == 401)
                    console.log('Unauthorized');
            });

            return token_result['token'];
        });
    }

    getting() {
        return this.change$.asObservable();
    }

    setUser() {
        const user = localStorage.getItem('user');
        this.user = user && user != 'undefined' ? JSON.parse(user) : null;
        this.change$.next(this.user);
    }

    getPicture() {
        return this.user?.avatar?.thumb ? IMAGES_ROOT + this.user.avatar.thumb : false;
    }

    hasCapability(type, value = null) {
        const capability = this.user['capability'] &&
    this.user['capability'][type] ? this.user['capability'][type] : null;
        return capability ?
            (value !== null ? capability == value : capability) : false;
    }

    isGuest(){
        return new Promise((resolve, reject) => {
            this.authService.isAuthenticated().subscribe((result) => {
                resolve(result);
            });
        });

    }

    hasRoles(roles: string[]) {
        for (const role of roles){
            if (this.hasRole(role))
                return true;
        }
        return false;
    }

    hasRole(role: string) {
        if (this.token && this.token.isValid) {
            if (role == 'admin') {
                return this.token.getPayload()['role'] == role || this.token.getPayload()['role'] == 'root';
            }
            return this.token.getPayload()['role'] == role;
        }
        return false;
    }

}