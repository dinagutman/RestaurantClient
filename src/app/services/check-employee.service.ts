import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class CheckEmployeeService {
  dateTimeWord: string;
  constructor(private http: HttpService) { }
  checkEmployeeInDB(name: string, pass: string) {
    try {
      localStorage.setItem('globalName', name);
      localStorage.setItem('globalPassword', pass);
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
    return this.http.get('api/Employee/checkAndGetRoleName/' + name + '/' + pass, { responseType: 'text' as 'json' });
  }
  checkIdForgot(id: number, fullName?: string) {
    return this.http.get('api/Employee/checkIdAndName/' + id + '/' + fullName);
  }
  addEmployee(employee: Employee) {
    return this.http.post('/api/Employee/addEmployee', employee);
  }
  DeleteEmployee(code:number){
    return this.http.post('api/Employee/DeleteEmployeeByCode/'+ code)
  }
  getAllEmployees() {
    return this.http.get('api/Employee/getAllEmployees');
  }
  getByCode(code: number) {
    return this.http.get('api/Employee/getByCode/' + code);
  }
  initDateTime(date: Date) {
    if (date.getHours() >= 0 && date.getHours() <= 7) {
      this.dateTimeWord = ' night';
    }
    else if (date.getHours() > 7 && date.getHours() <= 12) {
      this.dateTimeWord = ' morning';
    }
    else if (date.getHours() > 12 && date.getHours() <= 16) {
      this.dateTimeWord = ' noon';
    }
    else if (date.getHours() > 16 && date.getHours() < 20) {
      this.dateTimeWord = ' afternoon';
    }
    else if (date.getHours() >= 20 && date.getHours() <= 24) {
      this.dateTimeWord = ' evening';
    }
    return this.dateTimeWord;
  }

}
