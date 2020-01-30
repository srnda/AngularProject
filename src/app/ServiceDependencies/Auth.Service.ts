import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../TypeDefinitions/SignUpResponse.iType';
import {catchError} from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { User } from '../Models/User.model';
import { Router } from '@angular/router';

@Injectable()
export class Auth
{

    private _user:User;
    public LoggedInUser = new Subject<User>();
    set user(user:User)
    {
        this._user = user;
        this.LoggedInUser.next(this._user);
    }

    isLoggedIn():boolean
    {
      return !!this._user;
    }
    constructor(private http:HttpClient, private router:Router){}

    GetUserToken()
    {
      if(!this._user)
      {localStorage.removeItem('loggedInUser');return null;}
      const token = this._user.token;
      if (token){return token;}
      // this.LogOut();
      return null;
    }

    SignUp(email,password)
    {
        return this.http.post<AuthResponse>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCuPFtWEySlJoXrtP9yPe8FovriULgJGNg',
            {email:email,password:password,returnSecureToken:true})
            .pipe(catchError(errorResponse =>
                {
                    let errorTitle = 'Unknown error.';
                    let errorMessage = 'An unexpected error occurred.';

                    if(!(errorResponse.error && errorResponse.error.error)){return throwError([errorTitle,errorMessage]);}

                    if(errorResponse.error.error.message == 'EMAIL_EXISTS')
                    {
                        errorTitle = 'Duplicate email';
                        errorMessage = 'The entered email id is already registered.';
                    }

                    else if(errorResponse.error.error.message == 'INVALID_EMAIL')
                    {
                        errorTitle = 'Invalid email';
                        errorMessage = 'The entered email id is invalid.';
                    }
                    return throwError([errorTitle,errorMessage]);
                }));
    }

    LogIn(email,password)
    {
        return this.http.post<AuthResponse>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCuPFtWEySlJoXrtP9yPe8FovriULgJGNg',
            {email:email,password:password,returnSecureToken:true})
            .pipe(catchError(errorResponse =>
                {
                    let errorTitle = 'Unknown error.';
                    let errorMessage = 'An unexpected error occurred.';

                    if(!(errorResponse.error && errorResponse.error.error)){return throwError([errorTitle,errorMessage])}

                    if(errorResponse.error.error.message == 'INVALID_PASSWORD')
                    {
                        errorTitle = 'Wrong password';
                        errorMessage = 'The password entered is incorrect.';
                    }
                    else if(errorResponse.error.error.message == 'EMAIL_NOT_FOUND')
                    {
                        errorTitle = 'Invalid email';
                        errorMessage = 'The email entered is invalid or incorrect.';
                    }
                    return throwError([errorTitle,errorMessage]);
                }));
    }

    LogOut()
    {
      localStorage.removeItem('loggedInUser');
      this.user = null;
      this.router.navigate(['Auth/Login']);
    }

    AutoLogin()
    {
      const userDetails = localStorage.getItem('loggedInUser');
      if(!userDetails)
        {return;}
      const userRep:{id:string,email:string,_token:string,_expiresBy:string} = JSON.parse(userDetails);
      this.user = new User(userRep.id,userRep.email,userRep._token,new Date(userRep._expiresBy));

      this.AutoLogout(new Date(userRep._expiresBy).getTime() - new Date().getTime());

      this.router.navigate(['Recipes']);
    }

    AutoLogout(expMlSec:number)
    {
      setTimeout(() => {
        this.LogOut();
      }, expMlSec);
    }
}
