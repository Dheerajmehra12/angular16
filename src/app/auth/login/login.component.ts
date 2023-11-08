import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { response } from 'express';

@Component({
  selector: 'learn-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authService:AuthService){
  }
  title = 'working-app';
  activeTab='login-tab';
  loginUserDetails={
    email:'',
    password:''
  }
  createNewUserDetails={
    name:'',
    email:'',
    password:'',
    reEnteredPassword:''
  }

  login(){
    this.authService.login(this.loginUserDetails.email,this.loginUserDetails.password).subscribe({
      next:(data)=>{
        if(data && data.hasOwnProperty('name')){
          console.log("data",data);
        }
      },
      error:(e)=>{
        console.error(e);
      },
      complete() {
        console.log(" is completed")
      },
    })
  }

  createNew(){

  }

}
