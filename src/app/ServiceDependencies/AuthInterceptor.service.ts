import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { Auth } from './Auth.Service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{

  constructor(private authService:Auth){}

  intercept(req: HttpRequest<any>,next:HttpHandler){
    const token = this.authService.GetUserToken();
    if(req.url.includes('https://identitytoolkit.googleapis.com/v1/accounts:') || !(token) )
    {
      return next.handle(req);
    }
    const newReq = req.clone({params: new HttpParams().set('auth',this.authService.GetUserToken())});
    return next.handle(newReq);
  }

}
