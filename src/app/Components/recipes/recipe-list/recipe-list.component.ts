import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from 'src/app/Models/Recipe.model';
import { RecipeService } from 'src/app/ServiceDependencies/Recipe.Service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  private recepies:Recipe[];

  constructor(private recipeService:RecipeService) {}

  ngOnInit() {
    this.recepies =  this.recipeService.GetRecepies();
    this.recipeService.recipeAltered.subscribe( data=> 
      {//1* - a recipe
        if(data.edit == false) //added or deleted 1*
        {
          if(data.recipe == null)//deleted 1*
          {this.recepies = this.recipeService.GetRecepies();}
          else//added 1*
          {this.recepies.push(data.recipe);}
         }
        else //edited 1*
        {this.recepies[data.ind] = data.recipe;}
      });
  }

  mouseEnter(index:number,ele)
  {
    document.getElementById('img'+index).classList.add('hoverCard') ;
  }

  mouseLeave(index:number,ele)
  {
    document.getElementById('img'+index).classList.remove('hoverCard') ;
  }
  
  // RecipeClicked(clickIndex:number)
  // {
  //   this.recipeService.recipeSelected.emit(this.recepies[clickIndex]);
  // }
}
