import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { nearer } from 'q';

import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // User has logged in, all requests need to be authenticated
        // if (localStorage.getItem('currentUser')) {
        //     const cloneReq = request.clone({
        //         setHeaders: {
        //             Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`
        //         }
        //     });

        //     return next.handle(cloneReq);
        // }

        // For Login/registration reqeusts
        return next.handle(request);
    }
}
