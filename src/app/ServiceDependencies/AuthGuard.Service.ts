import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Auth } from './Auth.Service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate{
constructor(private authService:Auth, private router:Router){}


  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot): boolean | UrlTree
  {
    if(!this.authService.isLoggedIn())
    {return this.router.createUrlTree(['Auth/Login']);}
    else
    {return true;}
  }
}
