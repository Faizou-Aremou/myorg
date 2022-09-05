import { Component} from '@angular/core';
import { OpenFoodProductsFacade } from '../../state/open-food-products/open-food-products.facade';

@Component({
  selector: 'myorg-open-food-products',
  templateUrl: './open-food-products.component.html',
  styleUrls: ['./open-food-products.component.scss'],
})
export class OpenFoodProductsComponent {
  appTitle = '';
  productsByCategory$=this.openFoodProductsFacade.openFoodProductEntitiesByCategory$;

  constructor(private openFoodProductsFacade: OpenFoodProductsFacade) {
    this.openFoodProductsFacade.init();
  }

}
