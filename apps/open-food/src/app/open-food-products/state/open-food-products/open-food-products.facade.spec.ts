import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as OpenFoodProductsActions from './open-food-products.actions';
import { OpenFoodProductsEffects } from './open-food-products.effects';
import { OpenFoodProductsFacade } from './open-food-products.facade';
import { OpenFoodProductsEntity } from './open-food-products.models';
import {
  OPEN_FOOD_PRODUCTS_FEATURE_KEY,
  OpenFoodProductsState,
  initialOpenFoodProductsState,
  openFoodProductsReducer,
} from './open-food-products.reducer';
import * as OpenFoodProductsSelectors from './open-food-products.selectors';

interface TestSchema {
  openFoodProducts: OpenFoodProductsState;
}

describe('OpenFoodProductsFacade', () => {
  let facade: OpenFoodProductsFacade;
  let store: Store<TestSchema>;
  const createOpenFoodProductsEntity = (
    id: string,
    name = ''
  ): OpenFoodProductsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(
            OPEN_FOOD_PRODUCTS_FEATURE_KEY,
            openFoodProductsReducer
          ),
          EffectsModule.forFeature([OpenFoodProductsEffects]),
        ],
        providers: [OpenFoodProductsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(OpenFoodProductsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.openFoodProductEntitiesByCategory$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.openFoodProductEntitiesByCategory$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadOpenFoodProductsSuccess` to manually update list
     */
    it('allOpenFoodProducts$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.openFoodProductEntitiesByCategory$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        OpenFoodProductsActions.loadOpenFoodProductsSuccess({
          openFoodProducts: [
            createOpenFoodProductsEntity('AAA'),
            createOpenFoodProductsEntity('BBB'),
          ],
        })
      );

      list = await readFirst(facade.openFoodProductEntitiesByCategory$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
