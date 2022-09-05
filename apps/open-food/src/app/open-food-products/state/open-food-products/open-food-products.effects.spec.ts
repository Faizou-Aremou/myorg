import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as OpenFoodProductsActions from './open-food-products.actions';
import { OpenFoodProductsEffects } from './open-food-products.effects';

describe('OpenFoodProductsEffects', () => {
  let actions: Observable<Action>;
  let effects: OpenFoodProductsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        OpenFoodProductsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(OpenFoodProductsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', {
        a: OpenFoodProductsActions.initOpenFoodProducts(),
      });

      const expected = hot('-a-|', {
        a: OpenFoodProductsActions.loadOpenFoodProductsSuccess({
          openFoodProducts: [],
        }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
