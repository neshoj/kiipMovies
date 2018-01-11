import { ProfileResult } from './../profile-result';
import { Component, OnInit } from '@angular/core';
import { ServerRequestService } from 'app/server-request.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  profile: ProfileResult = {
    status: '',
    message: '',
    firstName: '',
    secondName: '',
    password: '',
    email: '',
    admin: false
  };

  constructor(private serverRequestService: ServerRequestService) { }

  ngOnInit() {
    this.fetchUserProfile();
  }

  fetchUserProfile(): void {
    this.serverRequestService.fetchProfileByEmail(JSON.parse(localStorage.getItem('currentUser')).user)
      .subscribe(result => this.profile = result);
  }
}
