import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  regsuccess: boolean;
  regfail: boolean;
  regmsg: string;
  constructor(public authService: AuthService) { this.regsuccess = false; this.regfail = false; }

  ngOnInit() {
  }

  register(): void {
    this.authService.register(this.model.firstName, this.model.secondName, this.model.email, this.model.password)
      .subscribe(result => {
        (result.status === '00') ? this.regsuccess = true : this.regsuccess = true;  // Check registration status
        this.regmsg = result.message;
      });
  }

}
