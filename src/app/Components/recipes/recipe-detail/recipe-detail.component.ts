import { Component, OnInit} from '@angular/core';
import { Recipe } from 'src/app/Models/Recipe.model';//src/app/Models/Recipe.model
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/ServiceDependencies/Recipe.Service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  private recipe:Recipe;

  constructor(private recipeService: RecipeService, private activeRoute: ActivatedRoute) 
  {
    console.log('recDetail');
  }

  ngOnInit() {
    this.activeRoute.params.subscribe
      (
        params => { this.recipe = this.recipeService.GetRecipe(params['index']); }
      );
  }

  // AddToCart()
  // {
  //   this.shoppingListService.InsertIngredients(this.recipe.ingredients);
  //   document.getElementById('nav_ShoppingList').click();
  // }
  // ReplaceCart()
  // {
  //   this.shoppingListService.ReplaceIngredients(this.recipe.ingredients);
  //   document.getElementById('nav_ShoppingList').click();
  // }
}
