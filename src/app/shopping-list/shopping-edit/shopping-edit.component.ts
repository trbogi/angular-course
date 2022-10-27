import {Component, ElementRef, EventEmitter, Output, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingListForm', {static: false}) slForm: NgForm
  editMode = false
  editSubscription: Subscription
  editedItemIndex: number
  editedItem: Ingredient
  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.editSubscription = this.slService.startedEditing.subscribe((index) => {
      this.editedItemIndex = index
      this.editedItem= this.slService.getIngredient(index)
      this.editMode = true
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    })
  }

  ngOnDestroy() {
    this.editSubscription.unsubscribe()
  }

  onAdd(form: NgForm):void{
    const ingName = form.value.name
    const ingAmount = form.value.amount
    const newIngredient = new Ingredient(ingName, ingAmount)
    if (this.editMode){
      this.slService.updateIngredient(this.editedItemIndex, newIngredient)
    }else{
      this.slService.addIngredient(newIngredient)
    }
    this.editMode = false
    form.reset()
  }
}
