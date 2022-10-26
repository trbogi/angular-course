import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {ShoppingListService} from "../../shopping-list/shopping-list.service";
import {Ingredient} from "../../shared/ingredient.model";
import {ActivatedRoute} from "@angular/router";
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
              private router: ActivatedRoute){ }

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.id = +params['id'];
      this.selectedRecipe = this.recipeService.getRecipeById(this.id)})

  }

  addToShoppingList(){
    this.slService.addIngredients(this.selectedRecipe.ingredients)
  }

}
