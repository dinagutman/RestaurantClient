import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private http: HttpService) { }

  checkRoleCodeByEmployeePassword(password: number) {
    return this.http.get('api/Role/checkRoleCodeByEmployeePassword/' + password);
  }
  getRoles() {
    return this.http.get('api/Role/getRoles');
  }
}
