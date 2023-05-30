import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { OrderDetails } from '../models/orderDetails';
import { MealCategoryService } from '../services/meal-category.service';
import { MealCategory } from '../models/mealCategory';
import { Meal } from '../models/meal';
import { MealService } from '../services/meal.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Params } from '@angular/router';
import { OrderDetailsService } from '../services/order-details.service';
import { TableService } from '../services/table.service';
import { UpdateTableData } from '../models/updateTableData';
import { StringOrderDetails } from '../models/stringOrderDetails';
@Component({
  selector: 'app-orders-in-process',
  templateUrl: './orders-in-process.component.html',
  styleUrls: ['./orders-in-process.component.css', './orders-in-process.component.scss']
})
export class OrdersInProcessComponent implements OnInit {
  employeeName = localStorage.getItem('globalName');
  employeePassword = localStorage.getItem('globalPassword');
  orderDetails = new OrderDetails();
  orderDetailsToDelete = new OrderDetails();
  listOrders: Order[];
  allCategories: MealCategory[];
  mealCategoryObject?: MealCategory;
  mealListByCategory: Meal[];
  totalpayment: any = 0;
  mealToGetPrice: Meal;
  brand: string;
  mealResults: Meal[];
  tableCode: number;
  orderCode: number;
  orderMealsList: StringOrderDetails[];
  mealToDelete?: StringOrderDetails;
  mealStringToAdd = new StringOrderDetails();
  servingAmount: number;
  isAddMeal: boolean;
  deletedSuccessfully: boolean;
  flagPayment: boolean;
  selectedYet = false;
  amountToOrderZero: boolean;
  noCategorySelected = false;
  noMealSelected = false;
  addAmountToMeal = false;
  mealDialog: boolean;
  submitted: boolean;
  selectedMealFromTable: OrderDetails;
  selectedCategoryName: any;
  selectedMealName: any;
  amountToOrder = 1;
  allMeals: Meal[];
  item: string;
  selectedMeal: string;
  myDate: any;
  date = new Date();
  createdAlready: boolean;
  // tslint:disable-next-line: max-line-length
  constructor(private orderService: OrderService, private mealCategoryService: MealCategoryService, private mealService: MealService, private activeRoute: ActivatedRoute, private orderDetailsService: OrderDetailsService, private tableService: TableService, private messageService: MessageService, private confirmationService: ConfirmationService) {
    setInterval(() => {
      this.myDate = new Date();
    }, 1000);
    this.activeRoute.params.subscribe((tableOrder: Params) => {
      //  tslint:disable-next-line: max-line-length
      this.tableCode = Number(tableOrder.tableCode); this.orderCode = Number(tableOrder.orderCode);
    });
    this.tableService.getAllBusyTables().subscribe(result => {
      this.orderService.listBusyTable = result;
      this.mealCategoryService.getAllCategories().subscribe(categoryResult => {
        this.allCategories = categoryResult
        this.mealService.getAllMeals().subscribe(mealRes => {
          this.allMeals = mealRes;
        });
      });
      orderService.isOrderPaid(this.orderCode).subscribe(paid => {
        if (paid === true) {
          for (const i of this.orderMealsList) {
            this.orderMealsList.pop();
          }
        } else {
          this.orderDetailsService.getOrderDetailsByOrderCode(this.orderCode).subscribe(res => {
            this.orderMealsList = res;
            if (this.orderMealsList.length > 0) {
              this.flagPayment = true;
            }
            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < this.orderMealsList.length; i++) {
              orderDetailsService.isMealCreated(this.orderMealsList[i].orderCode, this.orderMealsList[i].mealCode).subscribe(e => {
                this.orderMealsList[i].isMealCreated = e;
              });
            }
          });
        }
      });
    });
  }
  ngOnInit(): void { }
  openNew() {
    this.submitted = false;
    this.mealDialog = true;
    this.selectedCategoryName = 'Select a meal category';
    this.selectedMealName = 'Select a meal';
    console.log(this.allCategories);
  }
  hideDialog() {
    this.mealDialog = false;
    this.submitted = false;
    this.selectedCategoryName = 'Select a meal category';
    this.selectedMealName = 'Select a meal';
    this.amountToOrder = 0;
    this.noCategorySelected = false;
    this.noMealSelected = false;
    this.amountToOrderZero = false;
  }
  onSubmitOrder() {

    this.submitted = true;
    this.addAmountToMeal = false;
    if (this.selectedCategoryName === undefined || this.selectedCategoryName === 'Select a meal category') {
      this.noCategorySelected = true;
      return;
    }
    if (this.selectedMealName === undefined || this.selectedMealName === 'Select a meal') {
      this.noMealSelected = true;
      return;
    }
    if (this.amountToOrder === undefined || this.amountToOrder === 0) {
      this.amountToOrderZero = true;
      return;
    }
    this.orderDetails.orderCode = this.orderCode;
    this.orderDetails.mealCode = this.mealListByCategory.find(m => m.mealName === this.selectedMealName.mealName)?.mealCode;
    if (this.orderMealsList !== undefined && this.orderMealsList.find(m => m.mealCode === this.orderDetails.mealCode)) {
      const beforeAmount = this.orderMealsList.find(m => m.mealCode === this.orderDetails.mealCode)?.servingAmount;
      this.onServingAmountUpdate(Number(this.amountToOrder) + beforeAmount!, this.selectedMealName.mealName);
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Meal added successfully', life: 3000 });
      this.mealDialog = false;
      return;
    }
    this.orderDetails.servingAmount = this.amountToOrder.toString();
    this.orderDetails.howMuchMealCreated = 0;
    this.orderDetails.isMealCreated = false;
    this.mealStringToAdd = new StringOrderDetails();
    this.mealStringToAdd.orderCode = this.orderDetails.orderCode;
    this.mealStringToAdd.mealPrice = this.totalpayment;
    this.mealStringToAdd.servingAmount = Number(this.amountToOrder);
    this.mealStringToAdd.tableCode = this.tableCode;
    this.mealStringToAdd.mealName = this.selectedMealName.mealName;
    this.mealStringToAdd.mealCode = this.orderDetails.mealCode;
    if (this.amountToOrder.toString() !== '0') {
      this.orderDetailsService.addNewDetails(this.orderDetails).subscribe(result => {
        this.isAddMeal = result;
        if (this.isAddMeal === true) {
          if (this.orderMealsList !== undefined) {
            for (const item of this.orderMealsList) {
              if (item.mealCode === this.orderDetails.mealCode) {
                const parseAmount = Number(item.servingAmount) + Number(this.orderDetails.servingAmount);
                item.servingAmount = parseAmount;
                this.addAmountToMeal = true;
                break;
              }
            }
          }
          if (this.orderMealsList.length === 0 || this.addAmountToMeal === false) {
            this.orderMealsList.push(this.mealStringToAdd);
          }
          const data = new UpdateTableData();
          data.tableCode = this.tableCode;
          data.tableStatusCode = 502;
          this.flagPayment = true;
          this.tableService.updateTableStatus(data).subscribe(() => { });
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Meal added successfully', life: 3000 });
          this.mealDialog = false;
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Server is not available.', life: 3000 });
          this.mealDialog = false;
        }
      });
    }
    else {
      this.amountToOrderZero = true;
    }
    this.hideDialog();
  }
  onDeleteMeal(objectFromList: StringOrderDetails) {
    this.orderDetailsService.isMealCreated(this.orderCode, objectFromList.mealCode).subscribe(res => {
      this.createdAlready = res;
      if (this.createdAlready === true) {
        debugger
        // tslint:disable-next-line: max-line-length
        this.orderMealsList.find(o => o.mealCode === objectFromList.mealCode && o.orderCode === objectFromList.orderCode)!.isMealCreated = true;
        // tslint:disable-next-line: max-line-length
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'You cannot delete a meal wich is already created', life: 3000 });
        this.createdAlready = true;
        return;
      }
    });
    if (this.createdAlready === false) {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + objectFromList.mealName + ' from the order?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.orderDetailsToDelete.orderCode = this.orderCode;
          this.mealService.getMealByMealName(objectFromList.mealName).subscribe(result => {
            this.orderDetailsToDelete.mealCode = result.mealCode;
            this.orderDetailsToDelete.servingAmount = objectFromList.servingAmount.toString();
            this.orderDetailsToDelete.isMealCreated = false;
            this.orderDetailsToDelete.howMuchMealCreated = 0;
            const e = this.orderMealsList.findIndex(m => m.mealName === objectFromList.mealName);
            this.mealToDelete = this.orderMealsList.find(m => m.mealName === objectFromList.mealName);
            this.orderMealsList.splice(e, 1);
            if (this.orderMealsList.length === 0) {
              this.flagPayment = false;
              const data = new UpdateTableData();
              data.tableCode = this.tableCode;
              data.tableStatusCode = 501;
              this.tableService.updateTableStatus(data).subscribe(() => { });
            }
            if (this.orderDetailsToDelete !== null) {
              this.orderDetailsService.deleteMealFromOrder(this.orderDetailsToDelete).subscribe(res => {
                this.deletedSuccessfully = res;
                if (this.deletedSuccessfully === true) {
                  this.messageService.add({ severity: 'success', summary: 'Successful', detail: objectFromList.mealName + ' deleted successfully', life: 3000 });
                } else {
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Server is not available', life: 3000 });
                }
              });
            }
          });
        }
      });
    }
  }
  onCategoryChange(selectedCategoryName: any) {
    this.noCategorySelected = false;
    if (selectedCategoryName !== 'Select a meal category') {
      this.mealCategoryObject = this.allCategories.find(m => m.mealCategoryName === selectedCategoryName.mealCategoryName);
      this.mealService.getMealsByCategoryCode(this.mealCategoryObject!.mealCategoryCode).subscribe(result => {
        this.mealListByCategory = result;
      });
    }
  }
  onMealChange(selectedMeal: any) {
    this.amountToOrder = 1;
    this.noMealSelected = false;
    if (selectedMeal !== 'Select a meal') {
      this.selectedYet = true;
      this.mealService.getPriceByMealCode(this.mealListByCategory.find(m =>
        m.mealName === selectedMeal.mealName)!.mealCode).subscribe(result => {
          this.totalpayment = result;
        });
    } else {
      this.selectedYet = false;
    }
  }
  onMealAmountChange(selectedMeal: any, selectedAmountToOrder: number) {
    this.amountToOrder = selectedAmountToOrder;
    this.amountToOrderZero = false;
    if (selectedMeal.mealName !== 'Select a meal') {
      this.mealService.getPriceByMealCode(this.mealListByCategory.find(m =>
        m.mealName === selectedMeal.mealName)!.mealCode).subscribe(result => {
          this.totalpayment = result;
        });
      return this.totalpayment;
    }
  }
  onServingAmountUpdate(selectedAmount?: number, selectedMeal?: string) {
    const mealToUpdate = new OrderDetails();
    mealToUpdate.orderCode = this.orderCode;
    mealToUpdate.servingAmount = selectedAmount!.toString();
    this.mealService.getMealByMealName(selectedMeal).subscribe(res => {
      mealToUpdate.mealCode = res.mealCode;
      if (selectedAmount === Number('0') || selectedAmount!.toString() === '') {
        this.orderMealsList.find(o => o.mealCode === mealToUpdate.mealCode && o.orderCode === Number(mealToUpdate.orderCode))!
          .servingAmount = 1;
        mealToUpdate.servingAmount = '1';
        this.orderDetailsService.updateServingAmount(mealToUpdate).subscribe(() => { });
        return;
      }
      this.orderDetailsService.updateServingAmount(mealToUpdate).subscribe(() => { });
      this.orderMealsList.find(o => o.mealCode === mealToUpdate.mealCode && o.orderCode === Number(mealToUpdate.orderCode))!.servingAmount
        = Number(mealToUpdate.servingAmount);
    });
  }
}
