import { Component, Input, OnInit } from '@angular/core';
import { SharedUiCatalogAcpService } from '../../services/shared-ui-catalog-acp.service';
import { Product as CatalogProduct } from '@myorg/shared-ui-catalog';

import { Product } from '../../interfaces/product';

@Component({
  selector: 'myorg-open-food-catalog',
  templateUrl: './open-food-catalog.component.html',
  styleUrls: ['./open-food-catalog.component.scss'],
})
export class OpenFoodCatalogComponent implements OnInit {
  @Input() openFoodProducts?: Product[];
  catalogProducts: CatalogProduct[] = [];
  constructor(private sharedUiCatalogAcpService: SharedUiCatalogAcpService) {}

  ngOnInit(): void {
    if (this.openFoodProducts) {
      this.catalogProducts = this.openFoodProducts.map((product) =>
        this.sharedUiCatalogAcpService.catalogProduct(product)
      );
    }
  }
}
