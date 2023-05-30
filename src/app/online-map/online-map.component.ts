import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RestaurantTable } from '../models/restaurantTable';
import { TableService } from '../services/table.service';
import { Router } from '@angular/router';
import { CheckEmployeeService } from '../services/check-employee.service';
import { UpdateTableData } from '../models/updateTableData';
import { DictionaryTableOrder } from '../models/dictionaryTableOrder';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { WorkingHoursService } from '../services/working-hours.service';

@Component({
  selector: 'app-online-map',
  templateUrl: './online-map.component.html',
  styleUrls: ['./online-map.component.css']
})
export class OnlineMapComponent implements OnInit {
  myDate: any;
  date = new Date();
  dateTimeWord: string;
  employeeName = localStorage.getItem('globalName');
  employeePassword = localStorage.getItem('globalPassword');
  listTables: RestaurantTable[];
  tableToAdd = new DictionaryTableOrder();
  newOrder = new Order();
  tableCode: number;
  orderCode: number;
  tableStatusCode: number;
  background : string
  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private orderService: OrderService, private tableService: TableService, private employeeService: CheckEmployeeService, private workingHoursService: WorkingHoursService) {
    setInterval(() => {
      this.myDate = new Date();
    }, 1000);
    this.dateTimeWord = this.employeeService.initDateTime(this.date);
    this.tableService.getAllTables().subscribe(result => {
      this.listTables = result;
    });
  }
  getBackgroundColor(table: RestaurantTable){
     this.background = table.tableStatusCode === 500 ? 'rgb(78, 168, 78)' :
      table.tableStatusCode === 501 ? ' rgb(221, 125, 101)' :
        table.tableStatusCode === 502 ? 'rgb(238, 210, 52)' : 'rgb(73, 176, 211)';
        return this.background;
  } 
   mouseLeave(table: RestaurantTable) {
    const background = table.tableStatusCode === 500 ? 'rgb(78, 168, 78)' :
      table.tableStatusCode === 501 ? ' rgb(221, 125, 101)' :
        table.tableStatusCode === 502 ? 'rgb(238, 210, 52)' : 'rgb(73, 176, 211)';
    document.getElementById('table' + table.restaurantTableCode).style.backgroundColor = background;
  }
  hover(table: RestaurantTable) {
     this.background = table.tableStatusCode === 500 ? 'rgb(60,200,60)' :
      table.tableStatusCode === 501 ? 'rgb(224, 96, 64)' :
        table.tableStatusCode === 502 ? 'rgb(253, 231, 104)' : 'rgb(5, 159, 211)'; 
    document.getElementById('table' + table.restaurantTableCode).style.backgroundColor = this.background;
  }
  onFielsetClick(table: RestaurantTable) {
    this.tableCode = table.restaurantTableCode;
    this.orderService.getOrderCodeByTableCode(this.tableCode).subscribe(re => {
      this.orderCode = re;
      this.tableService.getTableStatusByTableCode(table.restaurantTableCode).subscribe(res => {
        this.tableStatusCode = res;
      });
    });
  }
  createNewOrder() {
    const data = new UpdateTableData();
    data.tableCode = this.tableCode;
    data.tableStatusCode = 501;
    this.tableService.updateTableStatus(data).subscribe(() => {
      this.newOrder.employeeCode = Number(this.employeePassword);
      this.newOrder.orderTime = new Date();
      this.newOrder.restaurantTableCode = this.tableCode;
      this.newOrder.totalpayment = 0;
      this.orderService.addNewOrder(this.newOrder).subscribe(d => {
        this.orderCode = d;
        this.tableToAdd.orderCode = this.orderCode;
        this.tableToAdd.tableCode = this.tableCode;
        this.router.navigate(['/orders-in-process', this.tableCode, this.orderCode]);
        
      });
    }
   
    );
  }
  exit() {
    this.workingHoursService.updateExitTimeAndTotalHours(Number(localStorage.getItem('workingHoursCode'))).subscribe(() => { });
  }
  ngOnInit(): void { }


}
