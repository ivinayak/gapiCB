import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public gapiSetup: boolean = false;
  public authInstance: gapi.auth2.GoogleAuth;
  public error: string;
  public user: any;
  apiUrl: string = 'http://localhost:8080/';
  userSignedIn: boolean;
  gapi:any;

  constructor(private userService: UserServiceService, private http: HttpClient,private router: Router) { }

  async ngOnInit() {
    if (await this.checkIfUserAuthenticated()) {
      this.user = this.authInstance.currentUser.get();
    }
  }

  async initGoogleAuth(): Promise<void> {
    const pload = new Promise((resolve) => {
      gapi.load('auth2', resolve);
    });
    return pload.then(async () => {
      await gapi.auth2
        .init({ client_id: '399222426294-s264pgsj0bo1cdootlfqtveg1hovo0pa.apps.googleusercontent.com' })
        .then(auth => {
          this.gapiSetup = true;
          this.authInstance = auth;
        });
    });
  }

  async authenticate(): Promise<gapi.auth2.GoogleUser> {
    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    // Resolve or reject signin Promise
    return new Promise(async () => {
      await this.authInstance.signIn().then(
        user => {this.user = user;
          this.checkIfUserExists(user);
          this.userService.setUser(user);
          this.userSignedIn = this.checkIfUserAuthenticated()},
        error => this.error = error
        );
    });
  }

  checkIfUserExists(user: any): any{
    this.http.get(this.apiUrl + 'findUser/' + user?.getBasicProfile().getEmail()).subscribe(value => {
      if(value){
        console.log("User Found");
        this.user.userType = value['userType'];
        this.router.navigate(["/login"]);
      }
      else{
        console.log("User not found");
        this.router.navigate(["/register"]);
      }
    });
  }

  checkIfUserAuthenticated(): boolean {
    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      this.initGoogleAuth();
    }

    return this.authInstance.isSignedIn.get();
  }

  logout(){
    this.authInstance.signOut();
    this.userSignedIn = false;
    this.router.navigate(['/']);
  }

  isUserSignedIn(){
    return this.userSignedIn;
  }
}
