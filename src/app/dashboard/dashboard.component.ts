import { Component } from '@angular/core';
import { TokenResult } from 'app/TokenResult';
import { AuthService } from 'app/auth.service';



@Component({
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
    username = 'username';
    title = 'KiipUp';

    constructor( private authService: AuthService) {
        this.username = (JSON.parse(localStorage.getItem('currentUser'))).user;
    }

    logout(): void {
        this.authService.logout();
    }
}
