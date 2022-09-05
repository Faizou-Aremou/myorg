import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  foodCategories(): Observable<string[]>{
    return of(['en:beverages', 'en:cereals-and-potatoes', 'en:breakfasts', 'en:condiments', 'en:soups'])
  }
}
