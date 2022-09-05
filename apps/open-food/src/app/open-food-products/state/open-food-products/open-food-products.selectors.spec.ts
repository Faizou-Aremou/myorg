import { OpenFoodProductsEntity } from './open-food-products.models';
import {
  openFoodProductsAdapter,
  OpenFoodProductsPartialState,
  initialOpenFoodProductsState,
} from './open-food-products.reducer';
import * as OpenFoodProductsSelectors from './open-food-products.selectors';

describe('OpenFoodProducts Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getOpenFoodProductsId = (it: OpenFoodProductsEntity) => it.id;
  const createOpenFoodProductsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as OpenFoodProductsEntity);

  let state: OpenFoodProductsPartialState;

  beforeEach(() => {
    state = {
      openFoodProducts: openFoodProductsAdapter.setAll(
        [
          createOpenFoodProductsEntity('PRODUCT-AAA'),
          createOpenFoodProductsEntity('PRODUCT-BBB'),
          createOpenFoodProductsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialOpenFoodProductsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('OpenFoodProducts Selectors', () => {
    it('getAllOpenFoodProducts() should return the list of OpenFoodProducts', () => {
      const results = OpenFoodProductsSelectors.getAllOpenFoodProducts(state);
      const selId = getOpenFoodProductsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = OpenFoodProductsSelectors.getSelected(
        state
      ) as OpenFoodProductsEntity;
      const selId = getOpenFoodProductsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getOpenFoodProductsLoaded() should return the current "loaded" status', () => {
      const result = OpenFoodProductsSelectors.getOpenFoodProductsLoaded(state);

      expect(result).toBe(true);
    });

    it('getOpenFoodProductsError() should return the current "error" state', () => {
      const result = OpenFoodProductsSelectors.getOpenFoodProductsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
