import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class MealCategoryService {
  constructor(private http: HttpService) { }
  getAllCategories() {
    return this.http.get( 'api/MealCategory/getAllCategories');
  }
}
