import {Component, ElementRef, EventEmitter, Output, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameRef', {static: true}) nameRef: ElementRef
  @ViewChild('amountRef', {static: true}) amountRef: ElementRef

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAdd():void{
    const ingName = this.nameRef.nativeElement.value
    const ingAmount = this.amountRef.nativeElement.value
    this.slService.addIngredient(new Ingredient(ingName, ingAmount))
  }
}
