import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {ShoppingListService} from "../../shopping-list/shopping-list.service";
import {Ingredient} from "../../shared/ingredient.model";
import {ActivatedRoute, Router} from "@angular/router";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  id: number
  selectedRecipe: Recipe

  constructor(private recipeService: RecipeService,
              private slService: ShoppingListService,
              private activatedRoute: ActivatedRoute,
              private router: Router){ }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = +params['id'];
      this.selectedRecipe = this.recipeService.getRecipeById(this.id)})

  }

  addToShoppingList(): void{
    this.slService.addIngredients(this.selectedRecipe.ingredients)
  }

  deleteRecipe(): void{
    this.recipeService.deleteRecipe(this.id)
    this.router.navigate(["/recipes"])
  }

}
