import { Injectable } from "@angular/core";
//import { Http, Response } from "@angular/http";
//ximport { HttpClient, Response } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
//import {  Response } from "@angular/http";
import 'rxjs/Rx';

import { Recipe } from "../models/recipe";
import { Ingredient } from "../models/ingredient";

import { AuthService } from "./auth";


@Injectable()
export class RecipesService {
  private recipes: Recipe[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService) {}

  addRecipe(title: string,
            description: string,
            difficulty: string,
            ingredients: Ingredient[]) {
    this.recipes.push(new Recipe(title, description, difficulty, ingredients));
    console.log(this.recipes);
  }

  getRecipes() {
    return this.recipes.slice();
  }

  updateRecipe(index: number,
               title: string,
               description: string,
               difficulty: string,
               ingredients: Ingredient[]) {
    this.recipes[index] = new Recipe(title, description, difficulty, ingredients);
  }

  removeRecipe(index: number) {
    this.recipes.splice(index, 1);
  }

  storeList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http.put('https://angular-ionic-shopping-recipes.firebaseio.com/' + userId + '/recipes.json?auth=' + token, this.recipes);
      // .map((response: Response) => response.json());//no longer needed with Httpclient in Angular 5
  }

  fetchList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http.get('https://angular-ionic-shopping-recipes.firebaseio.com/' + userId + '/recipes.json?auth=' + token)
      // .map((response: Response) => {//no longer needed with Httpclient in Angular 5
      //   let recipes: Recipe[];
      //    recipes = response.json() ? response.json() : [];
      //   for (let item of recipes) {
      //     if (!item.hasOwnProperty('ingredients')) {
      //       item.ingredients = [];//create empty array to prevent error in case there are not recipes in DB
      //     }
      //   }
      //   return recipes;
      // })
      .do((recipes: Recipe[]) => {
        if (recipes) {
          this.recipes = recipes;
        } else {
          this.recipes = [];
        }
      });
  }
}
