## Recipe Book App w/ Ionic angular

https://www.udemy.com/ionic-2-the-practical-guide-to-building-ios-android-apps/learn/v4/t/lecture/6352852?start=0

  ` ionic start shopping-list blank `

  ` cd shopping-list `

  ` npm run ionic:serve `

## create pages

  ` ionic generate page shopping-list `

  ` ionic generate page recipes `

  ` ionic generate page recipe `

  ` ionic generate page edit-recipe `

  ` ionic generate page tabs `


  * add all new pages to `app.module` ..ie., `import`
+ `declarations array`  + `entryComponents`


## Set up tabs navigation

  - `  rootPage:any = TabsPage;` in `app/app.component.ts`

  - reference pages and give them type/property in `tabs.ts`


## Template driven VS Reactive forms(create form on your own )

  - different input components

  * Template driven :


    - `shopping-list.html`


## Submitting the (Template-driven) Form


  - in `shopping-list.html` ....`#f="ngForm" ` + `(ngSubmit)="onAddItem(f)"` provides access to form

## Validate the Form

  - `required`

  - `[disabled]="!f.valid"`

## Handling Data w/a model for our ingredients

  - create `services` directory

      - create `shopping-list.ts` + `recipes.ts`

  - create `models` directory


## Display items from shopping listItems

  - in `shopping-list.html`:

      -`<ion-item *ngFor="let item of listItems; let i = index"   (click)="onCheckItem(i)">
        <h3>{{ item.name }} ({{ item.amount }})</h3>
      </ion-item>`

  - in `shopping-list.ts`:

        - `ionViewWillEnter() {
                this.loadItems();
              }`

    - remove item:

      - `  onCheckItem(index: number) {
             this.slService.removeItem(index);
             this.loadItems();
           }`

    * How to slide items?  look up...


## Creating a Reactive Form for `edit-recipe.html`

  - `edit-recipe.ts`:

        - `import { Component, OnInit } from '@angular/core';
              import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
              import {
                NavParams,
                ActionSheetController,
                AlertController,
                ToastController, NavController
              } from "ionic-angular";`

              - `npm i @angular/platform-server --save`

    - bind to reactive form via `edit-recipe.html`

      - `[formGroup]="recipeForm"`
