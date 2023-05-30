import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { HttpService } from './http.service';
import { DictionaryTableOrder } from '../models/dictionaryTableOrder';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  listBusyTable: DictionaryTableOrder[] = [];
  pass: number;
  constructor(private http: HttpService) {
    this.pass = Number(localStorage.getItem('globalPassword'));
  }
  getAllOrdersByEmployee() {
    return this.http.get('api/Order/GetAllOrdersByEmployeeCode/' + this.pass);
  }
  addNewOrder(newOrder?: Order) {
    const orderCode = this.http.post('api/Order/addNewOrder', newOrder);
    return orderCode;
  }
  getOrderCodeByTableCode(tableCode?: number) {
    return this.http.get('api/Order/getOrderCodeByTableCode/' + tableCode);
  }
  getOrderPriceByOrderCode(orderCode: number) {
    return this.http.get('api/Order/getOrderPriceByOrderCode/' + orderCode);
  }
  deleteOrderByOrderCode(orderCode: number) {
    return this.http.post('api/Order/deleteOrderByOrderCode/', orderCode);
  }
  updateTotalPaymentForOrder(orderToUpdate) {
    return this.http.post('api/Order/updateTotalPaymentForOrder/', orderToUpdate);
  }
  isOrderPaid(orderCode: number) {
    return this.http.get('api/Order/isOrderPaid/' + orderCode);
  }
  getTotalIncomeToDay() {
    return this.http.get('api/Order/getTotalIncomeToDay');
  }
  getPdfReceipt(orderCode: number) {
    return this.http.get('api/Order/pdf/' + orderCode, {responseType: 'blob'});
  }
  showPriceOnTable(tableCode: number) {
    this.getOrderCodeByTableCode(tableCode).subscribe(result => {
      const orderCode = result;
      this.getOrderPriceByOrderCode(orderCode).subscribe(res => {
        return res;
      });
    });
  }
}
