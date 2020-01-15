import { Recipe } from 'src/app/Models/Recipe.model';
import { Ingredient } from '../Models/Ingredient.model';
import { Subject } from 'rxjs';

export class RecipeService
{
    // public recipeSelected = new EventEmitter<Recipe>();
    public recipeSelected = new Subject<Recipe>();
    private recepies:Recipe[] = 
  [
    new Recipe('Prawn Salad','Salad of steamed and pepper fried prawn and fresh cut fruits and vegetables',
    'https://source.unsplash.com/1000x200/?prawn',
     [new Ingredient('Prawn',100,'Prawn Description',1), new Ingredient('Cabbage',1,'Cabbage Description',1)]),
    new Recipe('Quiche','Swiss cheese, ham, parsley, and pimento peppers come together deliciously in this recipe that\'s specifically meant to be a make-ahead option.',
    'https://source.unsplash.com/1000x200/?quiche',
    [new Ingredient('Ham',250,'Ham description',2),new Ingredient('Parseley',10,'Parseley description',1),
    new Ingredient('Primento',100,'Primento description',2)]),
    new Recipe('StrawCheese French Toast','French toast topped with glazed strawberries and stuffed with cheesecake. Soooo good and original. Perfect to impress at a brunch. Serve with mimosas for a fancier brunch-type setting',
    'https://source.unsplash.com/1000x200/?FrenchToast',
    [new Ingredient('Strawberry',10,'Strawberry description',1),new Ingredient('Cheese',50,'Cheese description',2),
    new Ingredient('Wheat bread crust',1,'Wheat bread crust description',1)]),
    new Recipe('Martini','A cocktail made with gin and vermouth, and garnished with an olive or a lemon twist. Over the years, the martini has become one of the best-known mixed alcoholic beverages.',
    'https://source.unsplash.com/1000x200/?Martini',
    [new Ingredient('Gin',30,'Gin description',3),new Ingredient('Vermouth',50,'Vermouth description',3),
    new Ingredient('Olive',1,'Olive description',1)]
    )
  ];

    GetRecepies()
    {
        return this.recepies.slice();
    }

    GetRecipe(index:number): Recipe
    {
      return this.recepies[index]
    }

}