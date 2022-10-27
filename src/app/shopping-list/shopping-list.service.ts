import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";

export class ShoppingListService{
  ingredientsChanged = new Subject<Ingredient[]>()
  startedEditing = new Subject<number>()

  private ingredients: Ingredient[] = [
    new Ingredient("apple", 2),
    new Ingredient("milk", 3)
  ]

  getIngredient(index){
    return this.ingredients[index]
  }

  getIngredients(){
    return this.ingredients.slice()
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient)
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  updateIngredient(index:number, updatedIngredient: Ingredient){
    this.ingredients[index] = updatedIngredient
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  deleteIngredient(index:number){
    this.ingredients.splice(index, 1)
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  addIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients)
    this.ingredientsChanged.next(this.ingredients)
  }
}
