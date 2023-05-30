import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CheckEmployeeService } from '../services/check-employee.service';

@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.css']
})
export class AllEmployeesComponent implements OnInit {

  allEmployees: any[]
  constructor( private messageService: MessageService,private EmployeeSer:CheckEmployeeService) { }

  ngOnInit(): void { 
    this.EmployeeSer.getAllEmployees().subscribe(data=> 
      this.allEmployees=data)
  }
  showSuccess(employeeDetail: string) {
    this.messageService.add({ key: 'bc', severity: 'success', summary: 'Success', detail: employeeDetail });
  }
  showError(employeeDetail: string) {
    this.messageService.add({ key: 'bc', severity: 'error', summary: 'Error', detail: employeeDetail });
  }
  DeleteEmployee(codeEmployee:number,name: string) {
    debugger
    this.EmployeeSer.DeleteEmployee(codeEmployee).subscribe(data => {
      if (data) {
        this.showSuccess('The deletion of the employee: ' + name + '  was successful');
      }
      else {
        this.showError('The deletion of the employee : ' + name +'  failed');
      }
    })
  }


}
