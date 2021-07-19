import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html'
})
export class RegisterPageComponent implements OnInit {

  user: any;
  userType: any;
  seller: any;

  consumer:any;
  userForm: any;
  userTypeList: any = [];
  type1: any;
  type2: any;
  constructor(private userService: UserServiceService) { }

  ngOnInit(): void {
    
    this.type1 = {
      isChecked : false,
      type : 'Seller'
    };
    this.type2 = {
      isChecked : false,
      type : 'Consumer'
    };
    this.userTypeList.push(this.type1, this.type2);
    this.userForm = new FormGroup({
      userType: new FormControl()
    }); 
    this.user = this.userService.getUser();
    console.log(this.user);
  }

  onChange(value){
    this.userType = value;
    if(this.userType == 'Seller'){
      this.type1.isChecked = true;
      this.type2.isChecked = false;
    }
    if(this.userType == 'Consumer'){
      this.type1.isChecked = false;
      this.type2.isChecked = true;
    }
  }

  signUp(){
    if(this.userType != "Seller" && this.userType != "Consumer"){
      return window.alert("Please select a user type");
    }
    this.user.userType = this.userType;
    this.userService.register(this.user);
  }
}
