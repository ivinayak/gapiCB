import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit {

  user: any;
  constructor(private userService: UserServiceService, private authService: AuthService) { }

  ngOnInit(): void {
    
    this.user = this.userService.getUser();
    console.log(this.user);
  }

  signOut() {
    this.authService.logout();
  }

}
