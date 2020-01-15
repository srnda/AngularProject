import { Component, OnInit,EventEmitter ,Output} from '@angular/core';
import { Ingredient } from 'src/app/Models/Ingredient.model';
import { ShoppingListService } from 'src/app/ServiceDependencies/ShoppingList.Service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {

  @Output() public newIngredientAdded = new EventEmitter<Ingredient>()
  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit() {

  }

  AddIngredient(name:string, quantity:number, sUnit:number)
  {
    if (sUnit != 0){
    this.shoppingListService.AddIngredient(new Ingredient(name,quantity,'',sUnit));
      //  this.newIngredientAdded.emit(new Ingredient(name,quantity,''));
  }
}
} 
