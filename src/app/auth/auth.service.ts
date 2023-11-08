import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { StorageKeys } from '../common/constants/storage-key';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn:'root'
})
export class AuthService {
  loggedIn=false;
  checkLogin: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private http:HttpClient) {
    // this.checkLogin.subscribe(loggedIn => {
    //   this.loggedIn = loggedIn;
    // });
    // const authToken = null;
    // const authToken = this.storageService.get(StorageKeys.AUTH_TOKEN);
    // if (authToken !== null) {
    //   this.checkLogin.emit(true);
    // }
   }
   loggedInFn() {
    return !!localStorage.getItem(StorageKeys.AUTH_TOKEN);
  }

  login(email:string,password:string){
    return this.http.post('api/login',{email,password});
  }

}
