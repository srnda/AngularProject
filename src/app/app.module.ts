import { BrowserModule } from '@angular/platform-browser';
import { NgModule, forwardRef } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponentComponent } from './Components/header-component/header-component.component';
import { Routes, RouterModule } from '@angular/router';
import { RecipeService } from './ServiceDependencies/Recipe.Service';
import { ShoppingListService } from './ServiceDependencies/ShoppingList.Service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Auth } from './ServiceDependencies/Auth.Service';
import { AuthInterceptor } from './ServiceDependencies/AuthInterceptor.service';
import { AuthGuard } from './ServiceDependencies/AuthGuard.Service';
import { RecipeModule } from './Components/recipes/Recipe.Module';
import { ShoppingListModule } from './Components/shopping-list/ShoppingList.Module';
import { AuthModule } from './Components/authentication/Auth.Module';

const routes:Routes =
[
  {path:'',redirectTo:'Auth/Login',pathMatch:'full'}  
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    RecipeModule,
    ShoppingListModule,
    AuthModule
  ],
  providers:[ShoppingListService,RecipeService,Auth, {provide:HTTP_INTERCEPTORS ,useClass:AuthInterceptor,multi:true},AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
