import {Component, ElementRef, EventEmitter, Output, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAdd(form: NgForm):void{
    const ingName = form.value.name
    const ingAmount = form.value.amount
    this.slService.addIngredient(new Ingredient(ingName, ingAmount))
  }
}
