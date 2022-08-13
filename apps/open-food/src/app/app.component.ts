import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'myorg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  appTitle = '';
  detailedFoodCategories$:Observable<unknown[]>=of([]);
}
