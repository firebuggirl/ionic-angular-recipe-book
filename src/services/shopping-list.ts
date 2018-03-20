import { Ingredient } from "../models/ingredient";
import { Injectable } from "@angular/core";
//import {  Response } from "@angular/http";
import { HttpClient  } from '@angular/common/http';
import 'rxjs/Rx';
//import { Observable } from "rxjs/Rx";//lazy loading

import { AuthService } from "./auth";


@Injectable()
export class ShoppingListService {
  private ingredients: Ingredient[] = [];
  //private ingredients: Observable<Ingredient[]> = [];

  constructor(
    //private http: Http,
    //responseOptions: ResponseOptions,
    private http: HttpClient ,
    private authService: AuthService) {
  }


  addItem(name: string, amount: number) {
    this.ingredients.push(new Ingredient(name, amount));
    console.log(this.ingredients);
  }

  addItems(items: Ingredient[]) {
    this.ingredients.push(...items);
  }

  getItems() {
    return this.ingredients.slice();
  }

  removeItem(index: number) {
    this.ingredients.splice(index, 1);
  }

  storeList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http
      .put('https://angular-ionic-shopping-recipes.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token, this.ingredients )
      // .map((response: Response) => {//no longer needed with Httpclient in Angular 5
      //   return response.json();
      // });
  }


  fetchList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http.get('https://angular-ionic-shopping-recipes.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token)
      // .map((response: Response) => {//no longer needed with Httpclient in Angular 5
      //   return response.json();
      // })
      .do((ingredients: Ingredient[]) => {
        if (ingredients) {
          this.ingredients = ingredients
        } else {
          this.ingredients = [];
        }
      });
  }
}
