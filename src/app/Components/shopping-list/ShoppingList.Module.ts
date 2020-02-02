import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule(
    {
        declarations:
        [
            ShoppingListComponent,
            ShoppingListEditComponent,
        ],
        imports:
        [
            CommonModule,
            BrowserModule,
            RouterModule.forChild([{path:'ShoppingList',component:ShoppingListComponent}]),
            FormsModule
        ]
    })
export class ShoppingListModule{}