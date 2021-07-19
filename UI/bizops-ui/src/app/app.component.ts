import { ChangeDetectorRef, Component } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TabsModule} from 'ngx-bootstrap/tabs';
import { Router, ActivatedRoute } from '@angular/router'; 
import { UserServiceService } from './user-service.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'bizops-ui';
  apiUrl = "http://localhost:8080/";
  consumerTab:boolean = false;
  
  gapi:any;
  userFound: boolean = false;
  userNotFound: boolean = false;
  showRegister: boolean;
  showLogin: boolean;
  userSignedIn: Promise<boolean>;
  constructor(private cdr: ChangeDetectorRef, private http : HttpClient,private router: Router, private route: ActivatedRoute, private userService: UserServiceService,private authService: AuthService){}

  

  authenticate(){
    this.authService.authenticate();
  }

  changeTab(type){
    if(type == 'Seller'){
      this.consumerTab = false;
    }
    else{
      this.consumerTab = true;
    }
  }

  isUserSignedIn(){
    return this.authService.isUserSignedIn();
  }
}

