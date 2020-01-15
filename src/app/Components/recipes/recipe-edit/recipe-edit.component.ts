import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/ServiceDependencies/Recipe.Service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  private editMode:boolean;
  private recipeId= -1;
  private title:string;
  constructor(private recipeService: RecipeService, private activeRoute: ActivatedRoute) {}
  ngOnInit() 
  {
    this.activeRoute.params.subscribe
      (
        params => 
          {
            this.editMode = params['index'];
            this.recipeId = params['index'];
          }
      );
      if (this.editMode)
      {this.title = this.recipeService.GetRecipe(this.recipeId).name + ', the way you want...';}
      else
      {this.title = 'Tell us your awesome recipe...'}
  }
}
