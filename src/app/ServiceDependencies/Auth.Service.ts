import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../TypeDefinitions/SignUpResponse.iType';
import {catchError} from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class Auth
{
    constructor(private http:HttpClient){}

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
}
