import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule(
    {
        declarations:[AuthenticationComponent],
        imports:
        [
            CommonModule,
            ReactiveFormsModule,
            RouterModule.forChild([{path:'Auth', children:[{path:':mode',component:AuthenticationComponent},]}]),
        ]
    })

export class AuthModule
{

}