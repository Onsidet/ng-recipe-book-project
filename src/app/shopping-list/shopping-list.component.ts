import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  template: `
  <div class="row">
    <div class="col-xs-10">
      <app-shopping-edit></app-shopping-edit>
      <hr>
      <ul class="list-group">
        <a
          class="list-group-item"
          style="cursor: pointer"
          *ngFor="let ingredient of ingredients; let i = index"
          (click)="onEditItem(i)"
        >
          {{ ingredient.name }} ({{ ingredient.amount }})
        </a>
      </ul>
    </div>
  </div>
  `,
  styles: [``]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  //@ts-ignore
  ingredients: Ingredient[];
  //@ts-ignore
  private subscription: Subscription;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.subscription = this.slService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
