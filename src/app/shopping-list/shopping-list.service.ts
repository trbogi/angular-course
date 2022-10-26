import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";

export class ShoppingListService{
  ingredientsChanged = new Subject<Ingredient[]>()

  private ingredients: Ingredient[] = [
    new Ingredient("apple", 2),
    new Ingredient("milk", 3)
  ]

  getIngredients(){
    return this.ingredients.slice()
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient)
    this.ingredientsChanged.next(this.ingredients)
  }

  addIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients)
    this.ingredientsChanged.next(this.ingredients)
  }
}
