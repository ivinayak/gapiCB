import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  url = "http://localhost:8080/";

  

  constructor(private http: HttpClient,private router: Router) { }
  user: gapi.auth2.GoogleUser;


  register(user: any) {
    let userToAdd = {
      email : user.getBasicProfile().getEmail(),
      firstName : user.getBasicProfile().getGivenName(),
      lastName : user.getBasicProfile().getFamilyName(),
      userType : user.userType
    };
    
    

    this.http.post(this.url + 'register', userToAdd).subscribe( val => {
      if(val){
        this.router.navigate(["/login"]);
      }
    });
  }

  setUser(user){
    if(user){
      this.user = user;
    }
    
  }

  getUser(){
    if(this.user){
      return this.user;
    }
    
  }
}
