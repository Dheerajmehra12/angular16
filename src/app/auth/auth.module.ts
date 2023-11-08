import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent
  ],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports:[
    AuthComponent,
    LoginComponent
  ],
  providers: [
    AuthService,
  ],
})
export class AuthModule {
  constructor(){
  console.log("called here....");
  }
 }
