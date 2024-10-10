import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, exhaustMap, map, of } from "rxjs";
import { GroceryService } from "../../grocery.service";
import { groceryAction } from "../actions/grocery.action";

@Injectable()
export class GroceryEffects {

  loadGroceries$ = createEffect(() => this.actions$.pipe(
    ofType(groceryAction.loadGroceries),
    exhaustMap(() => this.groceryService.fetchAllGroceries()
      .pipe(
        map((groceries:any) => (groceryAction.loadGroceriesSuccess({payload:groceries}))),
        catchError(() => of(groceryAction.loadGroceriesFailure()))
      ))
    )
  );

  constructor(private actions$: Actions, private groceryService: GroceryService) {

  }
}

