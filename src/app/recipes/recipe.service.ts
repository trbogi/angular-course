import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";

export class RecipeService{
  recipesChanged = new Subject<Recipe[]>()

  private recipes: Recipe[] = []

  getRecipes(): Recipe[]{
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes
    this.recipesChanged.next(this.recipes.slice())
  }

  getRecipeById(id: number): Recipe{
    return this.recipes[id]
  }

  updateRecipe(index: number, updatedRecipe: Recipe){
    this.recipes[index] = updatedRecipe
    this.recipesChanged.next(this.recipes.slice())
  }

  addRecipe(newRecipe: Recipe){
    this.recipes.push(newRecipe)
    this.recipesChanged.next(this.recipes.slice())
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1)
    this.recipesChanged.next(this.recipes.slice())
  }
}
