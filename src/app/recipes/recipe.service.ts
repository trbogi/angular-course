import {Recipe} from "./recipe.model";
import {EventEmitter} from "@angular/core";

export class RecipeService{
  selectedRecipe = new EventEmitter<Recipe>()

  private recipes: Recipe[] = [
      new Recipe("Test Recipe", "Test Description", "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg"),
      new Recipe("Test Recipe 2", "Test Description 2", "https://images.immediate.co.uk/production/volatile/sites/30/2022/05/Airfryer-hero-image-2a442a6.jpg?quality=90&resize=504%2C458")
  ]

  get(): Recipe[]{
    return this.recipes.slice();
  }
}
