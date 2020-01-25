import { Recipe } from 'src/app/Models/Recipe.model';
import { Ingredient } from '../Models/Ingredient.model';
import { Subject } from 'rxjs';
import{HttpClient} from '@angular/common/http'
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class RecipeService
{
  constructor(private http:HttpClient){}
    // public recipeSelected = new EventEmitter<Recipe>();
    public recipeSelected = new Subject<Recipe>();
    public recipeAltered = new Subject<{edit:boolean, recipe:Recipe,ind:number}>();
    public recipeLoading = new EventEmitter<boolean>();
    private recepies:Recipe[] = [];
  // [
  //   new Recipe('Prawn Salad','Salad of steamed and pepper fried prawn and fresh cut fruits and vegetables',
  //   'https://source.unsplash.com/1000x200/?prawn',
  //    [new Ingredient('Prawn',100,'Prawn Description',1), new Ingredient('Cabbage',1,'Cabbage Description',1)]),
  //   new Recipe('Quiche','Swiss cheese, ham, parsley, and pimento peppers come together deliciously in this recipe that\'s specifically meant to be a make-ahead option.',
  //   'https://source.unsplash.com/1000x200/?quiche',
  //   [new Ingredient('Ham',250,'Ham description',2),new Ingredient('Parseley',10,'Parseley description',1),
  //   new Ingredient('Primento',100,'Primento description',2)]),
  //   new Recipe('StrawCheese French Toast','French toast topped with glazed strawberries and stuffed with cheesecake. Soooo good and original. Perfect to impress at a brunch. Serve with mimosas for a fancier brunch-type setting',
  //   'https://source.unsplash.com/1000x200/?FrenchToast',
  //   [new Ingredient('Strawberry',10,'Strawberry description',1),new Ingredient('Cheese',50,'Cheese description',2),
  //   new Ingredient('Wheat bread crust',1,'Wheat bread crust description',1)]),
  //   new Recipe('Martini','A cocktail made with gin and vermouth, and garnished with an olive or a lemon twist. Over the years, the martini has become one of the best-known mixed alcoholic beverages.',
  //   'https://source.unsplash.com/1000x200/?Martini',
  //   [new Ingredient('Gin',30,'Gin description',3),new Ingredient('Vermouth',50,'Vermouth description',3),
  //   new Ingredient('Olive',1,'Olive description',1)]
  //   )
  // ];

    RecipeCount()
    {
      return this.recepies.length;
    }

    GetRecepies()
    {
        return this.recepies.slice();
    }

    GetRecipe(index:number): Recipe
    {
      return this.recepies[index]
    }
    AddRecipe(rec:Recipe)
    {
      this.recepies.push(rec);
      this.recipeAltered.next({edit:false,recipe:rec,ind:-1});
      return this.recepies.indexOf(rec);
    }
    EditedRecipe(recipeAlt:Recipe,id:number):boolean
    {
      this.recepies[id] = recipeAlt
      this.recipeAltered.next({edit:true,recipe:recipeAlt,ind:id}) 
      return true;
    }
    DeleteRecipe(index:number)
    {
      this.recepies.splice(index,1);
      this.recipeAltered.next({edit:false,recipe:null,ind:-1});
    }
    
    SaveData()
    {
      this.http.delete('https://nghttp-db.firebaseio.com/Recipes.json').subscribe(()=>
      {
        for (var rec of this.recepies)
        {
          this.http.post('https://nghttp-db.firebaseio.com/Recipes.json',rec).subscribe();
        }
      });
    }

    FetchData()
    {
      this.recepies = [];
      this.recipeLoading.emit(true);
      this.http.get('https://nghttp-db.firebaseio.com/Recipes.json').subscribe(data=>
        {
          for (var key in data)
          {
            var recObj = data[key];
            var ingrForRec = []
            var ingredientsDict =  recObj.ingredients;
            for (var ingrObjIndex in ingredientsDict)
            {
              ingrForRec.push( new Ingredient(ingredientsDict[ingrObjIndex]['name'],ingredientsDict[ingrObjIndex]['quantity'] ,ingredientsDict[ingrObjIndex]['preparation'],Ingredient.GetUnitId(ingredientsDict[ingrObjIndex]['units'])));
            }
            var recSer = new Recipe( recObj['name'], recObj['description'], recObj['imagePath'], ingrForRec)
            this.recepies.push( recSer );
          }
          this.recipeAltered.next({edit:false,recipe:null,ind:-1});
          this.recipeLoading.emit(false);
        });
    }

}