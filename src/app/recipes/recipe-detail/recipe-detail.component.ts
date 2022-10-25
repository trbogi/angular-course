import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {ShoppingListService} from "../../shopping-list/shopping-list.service";
import {Ingredient} from "../../shared/ingredient.model";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() selectedRecipe: Recipe

  constructor(private slService: ShoppingListService){ }

  ngOnInit(): void {
  }

  addToShoppingList(){
    this.slService.addIngredients(this.selectedRecipe.ingredients)
  }

}
