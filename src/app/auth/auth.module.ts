import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { AuthService } from './auth.service';
import { FormsModule } from '@angular/forms';
// import { HttpCl}

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule
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
