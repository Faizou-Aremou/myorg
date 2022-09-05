import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  OPEN_FOOD_PRODUCTS_FEATURE_KEY,
  OpenFoodProductsState,
  openFoodProductsAdapter,
} from './open-food-products.reducer';

// Lookup the 'OpenFoodProducts' feature state managed by NgRx
export const getOpenFoodProductsState =
  createFeatureSelector<OpenFoodProductsState>(OPEN_FOOD_PRODUCTS_FEATURE_KEY);

const { selectAll, selectEntities } = openFoodProductsAdapter.getSelectors();

export const getOpenFoodProductsLoaded = createSelector(
  getOpenFoodProductsState,
  (state: OpenFoodProductsState) => state.loaded
);

export const getOpenFoodProductsError = createSelector(
  getOpenFoodProductsState,
  (state: OpenFoodProductsState) => state.error
);

export const getAllOpenFoodProducts = createSelector(
  getOpenFoodProductsState,
  (state: OpenFoodProductsState) => selectAll(state)
);

export const getOpenFoodProductsEntities = createSelector(
  getOpenFoodProductsState,
  (state: OpenFoodProductsState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getOpenFoodProductsState,
  (state: OpenFoodProductsState) => state.selectedId
);

export const getSelected = createSelector(
  getOpenFoodProductsEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
