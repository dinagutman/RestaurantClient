import { Injectable } from '@angular/core';
import { OrderDetails } from '../models/orderDetails';
import { UpdateOrderDetailsData } from '../models/updateOrderDetailsData';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {

   constructor(private http: HttpService) { }

  addNewDetails(newDetailsMeal: OrderDetails) {
    return this.http.post('api/OrderDetails/addOrderDetails', newDetailsMeal);
  }
  deleteMealFromOrder(orderDetailsToDelete: OrderDetails) {
    return this.http.post('api/OrderDetails/deleteMealFromOrder', orderDetailsToDelete);
  }
  getOrderDetailsByOrderCode(orderCode: number) {
    return this.http.get('api/OrderDetails/getOrderDetailsByOrderCode/' + orderCode);
  }
  deleteMealByOrderCode(orderCode: number) {
    return this.http.post('api/OrderDetails/deleteMealByOrderCode/', orderCode);
  }
  updateServingAmount(mealToUpdate: OrderDetails) {
    return this.http.post('api/OrderDetails/updateServingAmount', mealToUpdate);
  }
  checkForNewOrderDetails() {
    return this.http.get('api/OrderDetails/checkForNewOrderDetails');
  }
  updateMealAfterCreating(data: UpdateOrderDetailsData) {
    return this.http.post('api/OrderDetails/updateMealAfterCreating', data);
  }
  isMealCreated(orderCode: number, mealCode?: number) {
    return this.http.get('api/OrderDetails/isMealCreated/' + orderCode + '/' + mealCode);
  }
  getSoldMealsAmount() {
    return this.http.get('api/OrderDetails/GetTotalSoldMealsToday');
  }
  //}‏‏
}