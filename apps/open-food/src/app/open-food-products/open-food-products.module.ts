import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenFoodProductsComponent } from './components/open-food-products/open-food-products.component';
import { BrowserModule } from '@angular/platform-browser';
import { SharedUiCatalogModule } from '@myorg/shared-ui-catalog';
import { SharedUiTabsModule } from '@myorg/shared/ui-tabs';
import { OpenFoodCatalogComponent } from './components/open-food-catalog/open-food-catalog.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromOpenFoodProducts from './state/open-food-products/open-food-products.reducer';
import { OpenFoodProductsEffects } from './state/open-food-products/open-food-products.effects';
import { OpenFoodProductsFacade } from './state/open-food-products/open-food-products.facade';

@NgModule({
  declarations: [OpenFoodProductsComponent, OpenFoodCatalogComponent],
  imports: [
    CommonModule,
    BrowserModule,
    SharedUiTabsModule,
    SharedUiCatalogModule,
    StoreModule.forFeature(
      fromOpenFoodProducts.OPEN_FOOD_PRODUCTS_FEATURE_KEY,
      fromOpenFoodProducts.openFoodProductsReducer
    ),
    EffectsModule.forFeature([OpenFoodProductsEffects]),
  ],
  exports:[OpenFoodProductsComponent],
  providers: [OpenFoodProductsFacade],
})
export class OpenFoodProductsModule {}
