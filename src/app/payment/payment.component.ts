import { Component, OnInit } from '@angular/core';
import { CreditCard } from '../models/creditCard';
import { OrderService } from '../services/order.service';
import { ActivatedRoute, Params } from '@angular/router';
import { OrderDetailsService } from '../services/order-details.service';
import { StringOrderDetails } from '../models/stringOrderDetails';
import { UpdateTableData } from '../models/updateTableData';
import { TableService } from '../services/table.service';
import { OrderToUpdate } from '../models/orderToUpdate';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  headElements = ['Meal Name', 'Amount', 'Price'];
  isSelectedCreditCard = false;
  isFormComplete = false;
  tableCode: number;
  orderCode: number;
  totalPrice: number;
  employeeName = localStorage.getItem('globalName');
  employeePassword = localStorage.getItem('globalPassword');
  creditCard = new CreditCard();
  MonthesInNumber: string[] = [];
  YearsInNumber: any[] = [];
  orderDetailsList: StringOrderDetails[] = [];
  mealsDeletedSuccessfully: boolean;
  orderDeletedSuccessfully: boolean;
  imgSrc: string;
  myDate: any;
  date = new Date();
  // tslint:disable-next-line: max-line-length
  constructor(private orderService: OrderService, private orderDetailsService: OrderDetailsService, private tableService: TableService, private activatedRoute: ActivatedRoute, private modalService: NgbModal, private messageService: MessageService) {
    // tslint:disable-next-line: max-line-length
    this.activatedRoute.params.subscribe((order: Params) => { this.orderCode = order.orderCode; });
    setInterval(() => {
      this.myDate = new Date();
    }, 1000);
    this.MonthesInNumber = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const currentYear = ((new Date()).getFullYear());
    this.YearsInNumber.push(currentYear);
    for (let i = 1; i < 10; i++) {
      this.YearsInNumber.push(currentYear + i);
    }
    this.orderService.getOrderPriceByOrderCode(this.orderCode).subscribe(result => {
      this.totalPrice = result;
      this.orderDetailsService.getOrderDetailsByOrderCode(this.orderCode).subscribe(list => {
        this.orderDetailsList = list;
        this.tableCode = this.orderDetailsList[0].tableCode;
      });
    });
  }
  ngOnInit(): void { }
  clearPaymentForm() {
    this.creditCard.cardHoldersName = '';
    this.creditCard.creditCardNumber = 0;
    this.creditCard.cvv = 0;
    this.creditCard.validityMonth = 0;
    this.creditCard.validityYear = 0;
    this.isFormComplete=false;
  }
  onCreditCardChange(selectedCreditCardCard: string) {
    this.isSelectedCreditCard = true;
    switch (selectedCreditCardCard) {
      case 'payPal':
        this.imgSrc = 'assets/payPal.jpg';
        break;
      case 'visa':
        this.imgSrc = 'assets/visa.PNG';
        break;
      case 'masterCard':
        this.imgSrc = 'assets/masterCard.jpg';
        break;
      case 'isracart':
        this.imgSrc = 'assets/Isracart.png';
    }
  }
  onFormComplete() {
    const englishLlettersRegex = /^[A-Za-z ]+$/;
    const hebrewLettersRegex = /[\u0590-\u05FF]/;
    if (!this.creditCard.cardHoldersName.match(englishLlettersRegex) && this.creditCard.cardHoldersName.search(hebrewLettersRegex) === -1) {
      this.creditCard.cardHoldersName = '';
      return;
    }
    if (this.creditCard.creditCardNumber !== null && this.creditCard.creditCardNumber.toString() !== '' &&
      (this.creditCard.cardHoldersName.match(englishLlettersRegex) || this.creditCard.cardHoldersName.search(hebrewLettersRegex) <= 0) &&
      this.creditCard.cardHoldersName !== ' ' && this.creditCard.cardHoldersName !== '' &&
      this.creditCard.validityMonth !== null && this.creditCard.validityMonth.toString() !== '' &&
      this.creditCard.validityYear !== null && this.creditCard.validityYear.toString() !== '' &&
      this.creditCard.cvv !== null && this.creditCard.cvv.toString() !== '' && this.creditCard.cvv.toString().length === 3) {
      this.isFormComplete = true;
    }
  }
  cash() {
    this.isSelectedCreditCard = false;
  }
  onSubmitPayment() {
    const data = new UpdateTableData();
    data.tableCode = this.tableCode;
    data.tableStatusCode = 500;
    this.tableService.updateTableStatus(data).subscribe(() => { });
    const orderData = new OrderToUpdate();
    orderData.orderCode = this.orderCode;
    orderData.totalPayment = this.totalPrice;
    this.orderService.updateTotalPaymentForOrder(orderData).subscribe(() => { });
    this.showSuccess();
    this.orderService.getPdfReceipt(this.orderCode).subscribe(res => {
      const url = window.URL.createObjectURL(res);
      window.open(url);
    });
    // this.orderDetailsService.deleteMealByOrderCode(this.orderCode).subscribe(result => {
    //   this.mealsDeletedSuccessfully = result;
    //   alert(this.mealsDeletedSuccessfully);
    //   this.orderService.deleteOrderByOrderCode(this.orderCode).subscribe(res => {
    //     this.orderDeletedSuccessfully = res;
    //     alert(this.orderDeletedSuccessfully);
    //   });
    // });
  }
  closeDialog() {
    this.modalService.dismissAll();
  }
  showSuccess() {
    this.messageService.add({ key: 'br', severity: 'success', summary: 'Success', detail: 'Payment Successful' });
  }
}
