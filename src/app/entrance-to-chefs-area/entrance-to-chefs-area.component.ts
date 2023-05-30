import { Component, OnInit } from '@angular/core';
import { OrderDetailsService } from '../services/order-details.service';
import { StringOrderDetails } from '../models/stringOrderDetails';
import { UpdateOrderDetailsData } from '../models/updateOrderDetailsData';
import { UpdateTableData } from '../models/updateTableData';
import { TableService } from '../services/table.service';
import { CheckEmployeeService } from '../services/check-employee.service';
import { MessageService } from 'primeng/api';
import { WorkingHoursService } from '../services/working-hours.service';

@Component({
  selector: 'app-entrance-to-chefs-area',
  templateUrl: './entrance-to-chefs-area.component.html',
  styleUrls: ['./entrance-to-chefs-area.component.css']
})
export class EntranceToChefsAreaComponent implements OnInit {
  headElements = ['Order code', 'Meal name', 'Amount'];
  myDate: any;
  date = new Date();
  dateTimeWord: string;
  employeeName = localStorage.getItem('globalName');
  employeePassword = localStorage.getItem('globalPassword');
  arrayMealsOfOrder: StringOrderDetails[] = [];
  newOrderDetaile: StringOrderDetails;
  IsChef;
  // tslint:disable-next-line: max-line-length
  constructor(private messageService: MessageService, private workingHoursService: WorkingHoursService, private orderDetailsService: OrderDetailsService, private tableService: TableService, private employeeService: CheckEmployeeService) {
    setInterval(() => {
      this.myDate = new Date();
    }, 1000);
    this.dateTimeWord = this.employeeService.initDateTime(this.date);
  }
  showNewMeal() {
    this.orderDetailsService.checkForNewOrderDetails().subscribe(result => {
      this.newOrderDetaile = result;
      if (this.newOrderDetaile === null) {
        this.showSuccess();
      } else {
        this.arrayMealsOfOrder.push(this.newOrderDetaile);
        this.updateCreatedMeal();
        this.updateTableStatus();
      }
    });
  }
  updateCreatedMeal() {
    const data = new UpdateOrderDetailsData();
    data.howMuchMealCreated = this.newOrderDetaile.servingAmount;
    data.isMealCreated = true;
    data.orderCode = this.newOrderDetaile.orderCode;
    data.mealCode = this.newOrderDetaile.mealCode;
    this.orderDetailsService.updateMealAfterCreating(data).subscribe(() => { });
  }
  updateTableStatus() {
    const data = new UpdateTableData();
    data.tableCode = this.newOrderDetaile.tableCode;
    data.tableStatusCode = 501;
    this.tableService.updateTableStatus(data).subscribe(() => { });
    
  }
  showSuccess() {
    this.messageService.add({ key: 'bc', severity: 'success', summary: 'Success', detail: 'There are no new meal to prepare.' });
  }

  ngOnInit(): void {
    if (localStorage.getItem('globalRole') !== null &&
      (localStorage.getItem('globalRole')?.toUpperCase() === "CHEF" ||
        localStorage.getItem('globalRole')?.toUpperCase() === "MANAGER")) {
      this.IsChef = true;
    }
    else {
      this.IsChef = false;
    }

  }
  
  exit() {
    this.workingHoursService.updateExitTimeAndTotalHours(Number(localStorage.getItem('workingHoursCode'))).subscribe(() => { });
  }
}
