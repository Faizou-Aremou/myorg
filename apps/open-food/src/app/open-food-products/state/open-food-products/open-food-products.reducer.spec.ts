import { Action } from '@ngrx/store';

import * as OpenFoodProductsActions from './open-food-products.actions';
import { OpenFoodProductsEntity } from './open-food-products.models';
import {
  OpenFoodProductsState,
  initialOpenFoodProductsState,
  openFoodProductsReducer,
} from './open-food-products.reducer';

describe('OpenFoodProducts Reducer', () => {
  const createOpenFoodProductsEntity = (
    id: string,
    name = ''
  ): OpenFoodProductsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid OpenFoodProducts actions', () => {
    it('loadOpenFoodProductsSuccess should return the list of known OpenFoodProducts', () => {
      const openFoodProducts = [
        createOpenFoodProductsEntity('PRODUCT-AAA'),
        createOpenFoodProductsEntity('PRODUCT-zzz'),
      ];
      const action = OpenFoodProductsActions.loadOpenFoodProductsSuccess({
        openFoodProducts,
      });

      const result: OpenFoodProductsState = openFoodProductsReducer(
        initialOpenFoodProductsState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = openFoodProductsReducer(
        initialOpenFoodProductsState,
        action
      );

      expect(result).toBe(initialOpenFoodProductsState);
    });
  });
});
