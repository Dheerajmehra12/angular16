import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteConstants } from './common/constants/route-constants';
import { AUTH_ROUTES } from './auth/auth.routing';
import { AuthComponent } from './auth/auth.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  {path: RouteConstants.AUTH, component: AuthComponent, children: AUTH_ROUTES, data: {auth: false}},
  {path: RouteConstants.ROOT, redirectTo: `/${RouteConstants.AUTH}/${RouteConstants.LOGIN}`, pathMatch: 'full', data: {auth: false}},
  {path: RouteConstants.NOT_FOUND, component: NotfoundComponent, data: {auth: false}},
  {path: RouteConstants.ANY, redirectTo: `/${RouteConstants.NOT_FOUND}`, data: {auth: false}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true, onSameUrlNavigation:'reload', scrollPositionRestoration:'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
