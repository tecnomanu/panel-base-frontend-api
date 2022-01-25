import {Inject, Injectable, Injector} from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NB_AUTH_INTERCEPTOR_HEADER, NbAuthService, NbTokenService} from '@nebular/auth';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

/**
 * TokenInterceptor
 * @see https://angular.io/guide/http#intercepting-all-requests-or-responses
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private injector: Injector,
        @Inject(NB_AUTH_INTERCEPTOR_HEADER) protected headerName: string = 'Authorization') {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = JSON.parse(localStorage.getItem('auth_app_token'));

        let req = request;
        if (token) {
            req = request.clone({
                headers: request.headers.set('Authorization', 'Bearer ' + token.value),
            });
        }

        return next.handle(req)
            .pipe(
                tap(
                    // Succeeds when there is a response; ignore other events
                    event => {},
                    // Operation failed; error is an HttpErrorResponse
                    err => {
                        if (err instanceof HttpErrorResponse) {
                            if (err.status === 401 || err.status === 0) {
                                this.tokenService.clear();
                                this.router.navigate(['auth/login']);
                            }
                            if (err.status === 403) {
                                this.router.navigate(['auth/verify']);
                            }
                        }
                    },
                ),
            );
    }

    handleError(error: HttpErrorResponse) {
        console.error('An error occurred:', error.error);
    }

    protected get tokenService(): NbTokenService {
        return this.injector.get(NbTokenService);
    }

    protected get authService(): NbAuthService {
        return this.injector.get(NbAuthService);
    }

}
