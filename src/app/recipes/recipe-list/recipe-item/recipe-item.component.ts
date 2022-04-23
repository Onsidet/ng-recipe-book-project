import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  template: `
    <a
    style="cursor: pointer;"
    [routerLink]="[index]"
    routerLinkActive="active"
    class="list-group-item clearfix">
    <div class="pull-left">
      <h4 class="list-group-item-heading">{{ recipe.name }}</h4>
      <p class="list-group-item-text">{{ recipe.description }}</p>
    </div>
    <span class="pull-right">
          <img
            [src]="recipe.imagePath"
            alt="{{ recipe.name }}"
            class="img-responsive"
            style="max-height: 50px;">
        </span>
    </a>
  `,
  styles: [``]
})
export class RecipeItemComponent implements OnInit {
  //@ts-ignore
  @Input() recipe: Recipe;
  //@ts-ignore
  @Input() index: number;

  ngOnInit() {
  }
}
