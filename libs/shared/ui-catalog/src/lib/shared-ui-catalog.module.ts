import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog/catalog.component';
import { ProductComponent } from './product/product.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CatalogComponent, ProductComponent],
  exports: [CatalogComponent],
})
export class SharedUiCatalogModule {}
