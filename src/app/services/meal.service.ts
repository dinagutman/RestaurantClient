import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  constructor(private http: HttpService) { }

  getMealsByCategoryCode(categoryCode: number) {
    return this.http.get('api/Meal/GetMealListByCategory/' + categoryCode);
  }
  getPriceByMealCode(mealCode: number) {
    return this.http.get('api/Meal/GetPriceByMealCode/' + mealCode);
  }
  getAllMealsByCharacter(char: string, categoryCode: number) {
    return this.http.get('api/Meal/GetAllMealsByCharacter/' + char + '/' + categoryCode);
  }
  getMealByMealCode(mealCode: number) {
    return this.http.get('api/Meal/GetMealByMealCode/' + mealCode);
  }
  getMealByMealName(mealName?: string) {
    return this.http.get('api/Meal/GetMealByMealName/' + mealName);
  }
  getAllMeals() {
    return this.http.get('api/Meal/GetAllMeals');
  }
}
