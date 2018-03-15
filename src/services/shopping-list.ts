import { Ingredient } from "../models/ingredient";

export class ShoppingListService {
  private ingredients: Ingredient[] = [];

  addItem(name: string, amount: number) {
    this.ingredients.push(new Ingredient(name, amount));
    console.log(this.ingredients);
  }

  addItems(items: Ingredient[]) {
    this.ingredients.push(...items);//`...` = ES6 deconstruct =
    //break doen array into its individual elements so that we
    //have a list of elements instead of an array , then push
    //individual elements to array
  }

  getItems() {
    return this.ingredients.slice();//create copy of array and return it
  }

  removeItem(index: number) {
    this.ingredients.splice(index, 1);
  }
}
