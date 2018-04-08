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


## Persisting data

  - ` ionic generate page signin `

  - ` ionic generate page signup `

  - ` ionic generate page database-options `

  - create `auth.ts` in `services`

  - import above via `app.module.ts` + add `AuthService` to list/array of providers

  - `npm i firebase --save `

      - in `app.component.ts`:

          - `import firebase from 'firebase';`

          - ` import { AuthService } from "../services/auth"; `

      - add auth to `app.component.ts` + `app.html`


  * Create new project via `Firebase`


    - click on `authentication` -> `Sign in Method`

         -  -> `email/password` -> `enable/save`//come back and auth w/ Facebook later


         - click `Web Setup` +  grab `apiKey` + `authDomain`

            - place in `app.component.ts`


  - in `sign-up.ts`:

      - ` import { AuthService } from "../../services/auth"; `

      - ` import { NgForm } from "@angular/forms"; `

      - ` onSignup(form: NgForm)`

  -  in `sign-up.html`:

      - add sign up form

  - in `sign-in.ts`:

    - ` import { NgForm } from "@angular/forms";
        import { LoadingController, AlertController } from "ionic-angular";

        import { AuthService } from "../../services/auth"; `

    - in `app.component.ts`:

        - ` import { SigninPage } from    "../pages/signin/signin";
           import { SignupPage } from "../pages/signup/signup";`



## Firebase cont...

- -> `Project Overview` -> `Web App` to get config/auth variables

* fetching the token from Firebase:

https://www.udemy.com/ionic-2-the-practical-guide-to-building-ios-android-apps/learn/v4/t/lecture/6353098?start=0

  - Firebase = NoSQL like MongoDB

  - create separate object/sub-property/folder in DB for currently logged in user via `services/shopping-list.ts` (ie., each user has his/her own node in DB):

      - inject `authService`

      -  Get active user: ` const userId = this.authService.getActiveUser().uid; `//uid = unique id for FB user

      - add `+ userId + '/shopping-list.json?auth=' + token, this.ingredients` to DB URL via `storeList` method

      - http service in `storeList` method returns and `observable`, which means that we need to `subscribe` to send request via `onShowOptions` method in `shopping-list/shopping-list.ts`


### More about Firebase:

  https://firebase.google.com/docs/

  - look at the "web" docs:

      https://firebase.google.com/docs/web/setup

  - Firebase Codelab:

     https://codelabs.developers.google.com/codelabs/firebase-web/#0





### NOTE:  Angular 5 + and HTTP

  https://www.udemy.com/ionic-2-the-practical-guide-to-building-ios-android-apps/learn/v4/t/lecture/6882276?start=0



  - Angular 5+, use the new `HttpClient` (will be mandatory Angular 6+).


    ` import { HttpClientModule } from '@angular/common/http'  `



    - add `HttpClientModule to imports[]` AppModule  

    - In files where you `inject Http` , you should now `inject HttpClient` .

    - To get access to this type/ class, you have to change the import from

      import { Http } from '@angular/http';

      to

      `import { HttpClient } from '@angular/common/http';`

      - Generally, you use HttpClient in exactly the same way, though one change is required: `HttpClient  extracts the data you get with the response automatically. Hence you don't need to map()  it manually anymore`.

      - So the following code

        `this.http.get('my-url').map(res => res.json())`

        will become

       ` this.http.get('my-url') `

       - `HttpClient.get()` applies `res.json()` automatically and returns `Observable<HttpResponse<string>`. You no longer need to call this function yourself.

       - remove `.map((res: Response) => res.json());` on requests

       https://stackoverflow.com/questions/46630893/angular-res-json-is-not-a-function



## JWT (JSON Web Token)

  * Teacher's notes:

      - During the compilation process, Cordova will convert our code such that it actually is not stored in localStorage  (we don't have that on a mobile device) but in an appropriate other space, preferably a SQLite database.
