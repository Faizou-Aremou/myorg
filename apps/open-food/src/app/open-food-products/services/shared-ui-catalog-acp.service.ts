import { Injectable } from '@angular/core';
import { Product as CatalogProduct } from '@myorg/shared-ui-catalog';
import { Product } from '../domain/models/types/product.model';



@Injectable({
  providedIn: 'root',
})
export class SharedUiCatalogAcpService {
  catalogProduct(product: Product): CatalogProduct {
    console.log(product);
    return {
      img: '',
      label: '',
    };
  }
}
