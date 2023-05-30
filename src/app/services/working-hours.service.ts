import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { WorkingHours } from '../models/workingHours';
import { HttpService } from './http.service';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class WorkingHoursService {

  constructor(private http: HttpService) { }
  addWorkingHours(workingHours: WorkingHours) {
    return this.http.post('api/WorkingHours/addWorkingHours', workingHours);
  }
  getWorkingHoursBetweenDates(from: Date, until: Date, search: string = ' ') {
    if (search === ' ' || search === '') {
      // tslint:disable-next-line: max-line-length
      return this.http.get('api/WorkingHours/getWorkingHoursBetweenDates/' + formatDate(from, 'yyyy-MM-ddTHH:mm:ss', 'en') + '/' + formatDate(until, 'yyyy-MM-ddTHH:mm:ss', 'en') + '/%20');
    }
    else {
      // tslint:disable-next-line: max-line-length
      return this.http.get('api/WorkingHours/getWorkingHoursBetweenDates/' + formatDate(from, 'yyyy-MM-ddTHH:mm:ss', 'en') + '/' + formatDate(until, 'yyyy-MM-ddTHH:mm:ss', 'en') + '/' + search);
    }
  }
  getAllWorkingHours() {
    return this.http.get('api/WorkingHours/getAllWorkingHours');
  }
  updateExitTimeAndTotalHours(workingHoursCode: number) {
    return this.http.post('api/WorkingHours/updateExitTimeAndTotalHours', workingHoursCode);
  }
  employeeDidntExitSystemLastTime(employeeCode: number) {
    return this.http.get('/api/WorkingHours/employeeDidntExitSystemLastTime/' + employeeCode);
  }
}
