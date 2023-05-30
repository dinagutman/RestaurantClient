import { Injectable } from '@angular/core';
import {  HttpHeaders } from '@angular/common/http';
import { HttpService } from './http.service';
import { UpdateTableData } from '../models/updateTableData';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private http: HttpService) { }
  httpOptions: { headers: HttpHeaders; };
  getAllTables() {
    return this.http.get('api/Tables/GetAll');
  }
  getAllAvailableTables() {
    return this.http.get('api/Tables/allAvailable');
  }
  updateTableStatus(data: UpdateTableData) {
    return this.http.post('api/Tables', data);
  }
  getAllBusyTables() {
    return this.http.get('api/Tables/getAllBusyTables');
  }
  getTableStatusByTableCode(tableCode?: number) {
    return this.http.get('api/Tables/getTableStatusByTableCode/' + tableCode);
  }
  AddNewTable(numberOfSeats:number){
    return this.http.post('api/Tables/'+ numberOfSeats)
  }

}
