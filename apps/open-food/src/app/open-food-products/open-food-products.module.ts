import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenFoodProductsComponent } from './components/open-food-products/open-food-products.component';
import { BrowserModule } from '@angular/platform-browser';
import { SharedUiCatalogModule } from '@myorg/shared-ui-catalog';
import { SharedUiTabsModule } from '@myorg/shared/ui-tabs';
import { OpenFoodCatalogComponent } from './components/open-food-catalog/open-food-catalog.component';

@NgModule({
  declarations: [OpenFoodProductsComponent, OpenFoodCatalogComponent],
  imports: [
    CommonModule,
    BrowserModule,
    SharedUiTabsModule,
    SharedUiCatalogModule,
  ],
})
export class OpenFoodProductsModule {}
