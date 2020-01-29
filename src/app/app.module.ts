import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponentComponent } from './Components/header-component/header-component.component';
import { RecipesComponent } from './Components/recipes/recipes.component';
import { RecipeListComponent } from './Components/recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './Components/recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './Components/recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './Components/shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './Components/shopping-list/shopping-list-edit/shopping-list-edit.component';
import { MouseEnterShowDropdownDirective } from './Directives/mouseenter-dropdown.directive';
import { MouseleaveDropdownDirective } from './Directives/mouseleave-dropdown.directive';
import { Routes, RouterModule } from '@angular/router';
import { RecipeStartComponent } from './Components/recipes/recipe-start/recipe-start.component';
import { RecipeService } from './ServiceDependencies/Recipe.Service';
import { RecipeEditComponent } from './Components/recipes/recipe-edit/recipe-edit.component';
import { ShoppingListService } from './ServiceDependencies/ShoppingList.Service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationComponent } from './Components/authentication/authentication.component';
import { Auth } from './ServiceDependencies/Auth.Service';

const routes:Routes =
[
  {path:'',redirectTo:'Recipes',pathMatch:'full'},
  {path:'Recipes',component:RecipesComponent, children:
    [
      {path:'',component:RecipeStartComponent},
      {path:'New',component:RecipeEditComponent},
      {path:':index/Edit',component:RecipeEditComponent},
      {path:':index',component:RecipeDetailComponent}
    ]
  },
  {path:'ShoppingList',component:ShoppingListComponent},
  {path:'Auth', children:
    [
      {path:':mode',component:AuthenticationComponent},
    ]
  }
]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponentComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    MouseEnterShowDropdownDirective,
    MouseleaveDropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent,
    AuthenticationComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule
  ],
  providers:[ShoppingListService,RecipeService,Auth],
  bootstrap: [AppComponent]
})
export class AppModule { }
