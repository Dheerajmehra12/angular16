import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { StorageKeys } from '../common/constants/storage-key';

@Injectable()
export class AuthService {
  loggedIn=false;
  checkLogin: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() {
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
}
