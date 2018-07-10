import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from 'app/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log('Auth guard called');
        const url: string = state.url;
        return this.checkLogin(url);
    }


    checkLogin(url: string): boolean {
        if (localStorage.getItem('currentUser')) { return true; }

        // Store the attempted URL for redirecting
        this.authService.redirectURL = url;

        
        // Navigate to the login page with extras
        this.router.navigateByUrl('/login');
        return false;
    }
}
