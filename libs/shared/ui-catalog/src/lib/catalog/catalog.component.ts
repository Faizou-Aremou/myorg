import { Component, Input } from '@angular/core';
import { Product } from '../interfaces/product';

@Component({
  selector: 'myorg-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent {
  @Input() products: Product[] = [];
}
