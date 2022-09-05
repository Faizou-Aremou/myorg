import { Injectable } from '@angular/core';
import { select, Store} from '@ngrx/store';

import * as OpenFoodProductsActions from './open-food-products.actions';
import * as OpenFoodProductsSelectors from './open-food-products.selectors';

@Injectable()
export class OpenFoodProductsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(
    select(OpenFoodProductsSelectors.getOpenFoodProductsLoaded)
  );
  openFoodProductEntitiesByCategory$ = this.store.pipe(
    select(OpenFoodProductsSelectors.getOpenFoodProductsEntities)
  );
  selectedOpenFoodProducts$ = this.store.pipe(
    select(OpenFoodProductsSelectors.getSelected)
  );

  constructor(private readonly store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(OpenFoodProductsActions.initOpenFoodProducts());
  }

  getAllFoodCategories(){
    this.store.dispatch(OpenFoodProductsActions.getAllFoodCategories());
  }
}
