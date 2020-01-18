import { Ingredient } from 'src/app/Models/Ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService
{
  private ingredients:Ingredient[] = []
  public ingredientAdded = new Subject<Ingredient[]>();
  public EditingIngredient = new Subject<number>();
  // public ingredientAdded = new EventEmitter<Ingredient[]>();

  AddIngredient(ing:Ingredient):boolean
  {

    if(ing.name == "" || ing.quantity < 1)
    {return;}
      for (var ind = 0;ind<this.ingredients.length;ind++)
      {
        const ingred = this.ingredients[ind];
        if (ingred.name == ing.name) 
        {
          if(ingred.quantity == ing.quantity)
          {
            if(ingred.units == ing.units)
            {
              var inn = this.ingredients.indexOf(ingred).toString()
              var accord =  document.getElementById('accord_'+inn);
              var textContent = document.getElementById('ingr_'+inn);

              if(accord == null ||textContent == null){return;}

              accord.classList.remove('border-dark');
              textContent.classList.remove('defaultFont')

              accord.classList.add('customDanger');
              textContent.classList.add('text-danger');
              accord.classList.add('border');
              accord.classList.add('border-danger');

              setTimeout(() => {
              textContent.classList.remove('text-danger')
              accord.classList.remove('customDanger');
              accord.classList.remove('border');
              accord.classList.remove('border-danger');

              textContent.classList.add('defaultFont')
              accord.classList.add('border-dark');
              }, 2000);
              return false;
            }
          }
          else{ingred.quantity = ing.quantity}
          this.ingredientAdded.next(this.ingredients);
          return true;
        }
      }
      ing.preparation = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem perspiciatis est libero ipsa iste dolor iure numquam, nulla sint sit accusantium expedita architecto optio vero amet officiis. Aliquid facere necessitatibus magni mollitia sed, minima quod, saepe minus eaque esse ipsum ullam illum illo voluptatum consectetur ab, debitis libero. Natus eos at dolore asperiores aut illo neque. Nostrum hic recusandae praesentium doloremque, corrupti at labore iusto sit et harum laborum facere. Sequi voluptas error, distinctio iusto ut itaque repellendus cum. Ab reiciendis architecto quibusdam reprehenderit excepturi sed nobis voluptatem facilis molestias cum magnam similique ea fuga eligendi accusantium aliquam, rem ipsum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque reprehenderit magni natus accusantium quam hic modi animi quo culpa consequatur.`;//this.ingredients[0].preparation;
      this.ingredients.push(ing)  ;
      this.ingredientAdded.next(this.ingredients);
      return true;
    }

  GetIngredients(global?:boolean)
  {
    if (global)
    {
      return this.ingredients;
    }
    return this.ingredients.slice();
  }

  GetIngredient(index:number)
  {
    return this.ingredients[index];
  }

  ReplaceIngredients(ingList:Ingredient[])
  {
    this.ingredients = ingList.slice();
    this.ingredientAdded.next(this.ingredients);
  }

  InsertIngredients(ingList:Ingredient[])
  {
    ingList.forEach(element => {
      this.AddIngredient( new Ingredient(element.name,element.quantity,'',0,element.units));
    });
  }
  DeleteIngredient(ingredient:Ingredient)
  {
    console.log(this.ingredients);
    
    for (var element of this.ingredients)
    {
      if (element.name == ingredient.name && element.quantity == ingredient.quantity && element.units)
      {
        this.ingredients.splice( this.ingredients.indexOf(element),1 );
        return;
      }      
    }

    console.log(this.ingredients);
    

  }
}