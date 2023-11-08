import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import { RouteConstants } from '../common/constants/route-constants';

export const AUTH_ROUTES: Routes = [
  {path: RouteConstants.ROOT, redirectTo: RouteConstants.LOGIN, pathMatch: 'full'},
  {path: RouteConstants.LOGIN, component: LoginComponent}
];