import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as OpenFoodProductsActions from './open-food-products.actions';
import { OpenFoodProductsEntity } from './open-food-products.models';

export const OPEN_FOOD_PRODUCTS_FEATURE_KEY = 'openFoodProducts';

export interface OpenFoodProductsState
  extends EntityState<OpenFoodProductsEntity> {
  selectedId?: string | number; // which OpenFoodProducts record has been selected
  loaded: boolean; // has the OpenFoodProducts list been loaded
  error?: string | null; // last known error (if any)
}

export interface OpenFoodProductsPartialState {
  readonly [OPEN_FOOD_PRODUCTS_FEATURE_KEY]: OpenFoodProductsState;
}

export const openFoodProductsAdapter: EntityAdapter<OpenFoodProductsEntity> =
  createEntityAdapter<OpenFoodProductsEntity>();

export const initialOpenFoodProductsState: OpenFoodProductsState =
  openFoodProductsAdapter.getInitialState({
    // set initial required properties
    loaded: false,
  });

const reducer = createReducer(
  initialOpenFoodProductsState,
  on(OpenFoodProductsActions.initOpenFoodProducts, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    OpenFoodProductsActions.loadOpenFoodProductsSuccess,
    (state, { openFoodProducts }) =>
      openFoodProductsAdapter.setAll(openFoodProducts, {
        ...state,
        loaded: true,
      })
  ),
  on(
    OpenFoodProductsActions.loadOpenFoodProductsFailure,
    (state, { error }) => ({ ...state, error })
  )
);

export function openFoodProductsReducer(
  state: OpenFoodProductsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
