import { Component } from '@angular/core';

@Component({
  selector: 'learn-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(){
    console.log("called..login")
  }
  title = 'working-app';
  activeTab='login-tab';
}
