import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {
  }

  storeRecipes(){
    const recipes = this.recipeService.getRecipes()
    this.http
      .put('https://ng-course-recipe-book-383df-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes)
      .subscribe(recipes => console.log(recipes))
  }

  fetchRecipes(){
    this.http
      .get<Recipe[]>('https://ng-course-recipe-book-383df-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
      .subscribe(recipes =>
        this.recipeService.setRecipes(recipes))

  }
}
