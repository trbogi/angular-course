import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
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

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params) => {
      this.id = +params['id']
      this.editMode = params['id'] != null
      this.initForm()
    })
  }

  private initForm(): void {
    let recipeName = ''
    let imgPath = ''
    let description = ''

    if (this.editMode){
      let recipe = this.recipeService.getRecipeById(this.id)
      recipeName = recipe.name
      imgPath = recipe.imagePath
      description = recipe.description
    }
    this.recipeForm = new FormGroup<any>({
      name: new FormControl(recipeName),
      imgPath: new FormControl(imgPath),
      description: new FormControl(description),
    })
  }

  onSubmit(){
    console.log(this.recipeForm)
  }

}
