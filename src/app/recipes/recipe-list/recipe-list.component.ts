import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Recipe} from '../recipe.model'
import {RecipeService} from "../recipe.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipesSubscription: Subscription
  recipes: Recipe[];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
     this.recipesSubscription = this.recipeService.recipesChanged.subscribe((recipes: Recipe[]) => {
       this.recipes = recipes
    });
     this.recipes = this.recipeService.getRecipes()
  }

  ngOnDestroy() {
    this.recipesSubscription.unsubscribe()
  }
}
