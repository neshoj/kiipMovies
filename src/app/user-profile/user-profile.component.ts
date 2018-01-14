import { ProfileResult } from './../profile-result';
import { Component, OnInit } from '@angular/core';
import { ServerRequestService } from 'app/server-request.service';
import { AuthService } from 'app/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userRole = 'User';
  profile: ProfileResult = {
    status: '',
    message: '',
    firstName: '',
    secondName: '',
    password: '',
    email: '',
    admin: false
  };

  constructor(private serverRequestService: ServerRequestService,
    private authService: AuthService) { }

  ngOnInit() {
    this.fetchUserProfile();
  }

  fetchUserProfile(): void {
    this.serverRequestService.fetchProfileByEmail(JSON.parse(localStorage.getItem('currentUser')).user)
      .subscribe(result => {

        if (result.status === '403') {
          this.authService.logout();
        }

        this.profile = result;
        if (this.profile.admin === true) { this.userRole = 'Administrator'; };
      });
  }
}
