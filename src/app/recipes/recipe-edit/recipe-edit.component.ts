import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  editMode: boolean = false
  id: number
  recipeForm: FormGroup

  constructor(private route: ActivatedRoute,
              private router: Router,
              private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params) => {
      this.id = +params['id']
      this.editMode = params['id'] != null
      this.initForm()
    })
  }

  private initForm(): void {
    let recipeName = ''
    let imagePath = ''
    let description = ''
    let ingredients = new FormArray([])

    if (this.editMode){
      let recipe = this.recipeService.getRecipeById(this.id)
      recipeName = recipe.name
      imagePath = recipe.imagePath
      description = recipe.description
      if (recipe.ingredients){
        for (const ingredient of recipe.ingredients) {
          ingredients.push(new FormGroup({
            name: new FormControl(ingredient.name, Validators.required),
            amount: new FormControl(ingredient.amount, [Validators.required, Validators.min(1)])
          }))
        }
      }
    }
    this.recipeForm = new FormGroup<any>({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      description: new FormControl(description, Validators.required),
      ingredients: ingredients
    })
  }

  onCancel(){
    this.router.navigate(["../"], {relativeTo: this.route})
  }

  onSubmit(){
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    }else{
      this.recipeService.addRecipe(this.recipeForm.value)
    }
    this.onCancel()
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      name: new FormControl(null),
      amount: new FormControl(null)
    }))
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }


}
