import { Component, Input } from '@angular/core';
import { Product } from '../types/product.model';

@Component({
  selector: 'myorg-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent{
  @Input() product?:Product;
}
