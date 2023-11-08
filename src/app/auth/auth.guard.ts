import { CanActivateFn,Router } from '@angular/router';
import { AuthService } from './auth.service'; 
import { Inject } from '@angular/core';
import { RouteConstants } from '../common/constants/route-constants';

export const authGuard: CanActivateFn = (route, state) => {
  const authService =  Inject(AuthService);
  // Check if the user is logged in using the AuthService
  if (authService.loggedInFn()) {
    return true; // If logged in, allow access to the route
  } else {
    return Inject(Router).navigate([`/${RouteConstants.AUTH}/${RouteConstants.LOGIN}`]); // If not logged in, deny access to the route
  }
};
