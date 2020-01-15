import { Component, OnInit,EventEmitter ,Output} from '@angular/core';
import { Ingredient } from 'src/app/Models/Ingredient.model';
import { ShoppingListService } from 'src/app/ServiceDependencies/ShoppingList.Service';
import { NgForm } from '@angular/forms';

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

//   AddIngredient(name:string, quantity:number, sUnit:number)
//   {
//     if (sUnit != 0){
//     this.shoppingListService.AddIngredient(new Ingredient(name,quantity,'',sUnit));
//       //  this.newIngredientAdded.emit(new Ingredient(name,quantity,''));
//   }
// }
Form_AdddIngredient(AddIngrForm:NgForm)
{
  var sUnit = AddIngrForm.value['units']
  if (sUnit != 0){
    this.shoppingListService
    .AddIngredient(new Ingredient(AddIngrForm.value['ingredientName'],AddIngrForm.value['Quantity'],'',sUnit));
    AddIngrForm.reset();  
  }
}
ResetForm(AddIngrForm:NgForm)
{
  AddIngrForm.reset();
}
} 
