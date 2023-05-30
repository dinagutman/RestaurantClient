import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class EmploymentService {

  constructor(private http: HttpService) { }
  getEmployments() {
    return this.http.get( 'api/Employment/getEmployments');
  }
}
