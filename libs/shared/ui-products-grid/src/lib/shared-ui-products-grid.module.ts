import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsGridComponent } from './products-grid/products-grid.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ProductsGridComponent],
  exports: [ProductsGridComponent],
})
export class SharedUiProductsGridModule {}
