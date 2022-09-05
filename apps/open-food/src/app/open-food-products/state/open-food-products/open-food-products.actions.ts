import { createAction, props } from '@ngrx/store';
import { OpenFoodProductsEntity } from './open-food-products.models';

export const initOpenFoodProducts = createAction(
  '[OpenFoodProducts Page] Init'
);

export const loadOpenFoodProductsSuccess = createAction(
  '[OpenFoodProducts/API] Load OpenFoodProducts Success',
  props<{ openFoodProducts: OpenFoodProductsEntity[] }>()
);

export const loadOpenFoodProductsFailure = createAction(
  '[OpenFoodProducts/API] Load OpenFoodProducts Failure',
  props<{ error: string | null }>()
);
export const getAllFoodCategories = createAction(
  '[OpenFoodProducts] Get Food Categories'
)
