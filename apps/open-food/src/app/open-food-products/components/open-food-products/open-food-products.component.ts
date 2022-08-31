import { Component} from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'myorg-open-food-products',
  templateUrl: './open-food-products.component.html',
  styleUrls: ['./open-food-products.component.scss'],
})
export class OpenFoodProductsComponent {
  appTitle = '';
  productsByCategory$:Observable<Product[][]>=of([]); //  create façade for every service
}
