import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";

export class RecipeService{

  private recipes: Recipe[] = [
      new Recipe("Test Recipe",
        "Test Description",
        "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg",
        [new Ingredient('meat', 2), new Ingredient('tomato', 3),
          new Ingredient('potato', 10),]),
      new Recipe("Test Recipe 2",
        "Test Description 2",
        "https://images.immediate.co.uk/production/volatile/sites/30/2022/05/Airfryer-hero-image-2a442a6.jpg?quality=90&resize=504%2C458",
        [new Ingredient('meat', 2), new Ingredient('avocado', 3),
          new Ingredient('lettuce', 3),])
  ]

  get(): Recipe[]{
    return this.recipes.slice();
  }

  getRecipeById(id: number): Recipe{
    return this.recipes[id]
  }
}
