import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as OpenFoodProductsActions from './open-food-products.actions';
import * as OpenFoodProductsFeature from './open-food-products.reducer';

@Injectable()
export class OpenFoodProductsEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OpenFoodProductsActions.initOpenFoodProducts),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return OpenFoodProductsActions.loadOpenFoodProductsSuccess({
            openFoodProducts: [],
          });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return OpenFoodProductsActions.loadOpenFoodProductsFailure({ error });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions) {}
}
