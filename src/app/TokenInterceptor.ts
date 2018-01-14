import { Observable } from 'rxjs/Observable';
import { Injectable, Injector } from '@angular/core';
import { nearer } from 'q';
import 'rxjs/add/operator/do';

import { HttpErrorResponse } from '@angular/common/http';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthService } from 'app/auth.service';
import { HttpResponse } from 'selenium-webdriver/http';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    authService: AuthService;
    // constructor(private authService: AuthService) { }

    constructor(private injector: Injector) {
        setTimeout(() => {
          this.authService = this.injector.get(AuthService);
        })
      }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // User has logged in, all requests need to be authenticated
        // if (localStorage.getItem('currentUser')) {
        //     const cloneReq = request.clone({
        //         setHeaders: {
        //             Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`
        //         }
        //     });

        //     return next.handle(cloneReq).do((event: HttpEvent<any>) => {
        //         if (event instanceof HttpResponse) { }
        //     }, (err: any) => {
        //         if (err instanceof HttpErrorResponse) {
        //             if (err.status === 403) {
        //                 this.authService.logout();
        //             }
        //         }
        //     });
        // }

        // For Login/registration reqeusts
        return next.handle(request);
    }
}
