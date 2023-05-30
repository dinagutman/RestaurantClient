import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CheckEmployeeService } from '../services/check-employee.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ElementRef } from '@angular/core';
import { OrderService } from '../services/order.service';
import { FormControl, Validators, FormGroup, MaxLengthValidator, FormBuilder } from '@angular/forms';
import { Employee } from '../models/employee';
import { Role } from '../models/role';
import { RoleService } from '../services/role.service';
import { Employment } from '../models/Employment';
import { EmploymentService } from '../services/employment.service';
import { MessageService } from 'primeng/api';
import { WorkingHoursService } from '../services/working-hours.service';
import { OrderDetails } from '../models/orderDetails';
import { OrderDetailsService } from '../services/order-details.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableService } from '../services/table.service';
import { cwd } from 'process';



@Component({
  selector: 'app-manager-area',
  templateUrl: './manager-area.component.html',
  styleUrls: ['./manager-area.component.css'],
  providers: [NgbModalConfig, NgbModal, FormsModule, ReactiveFormsModule, MessageService]
})
export class ManagerAreaComponent implements OnInit {
  validatingForm: FormGroup;
  deleteEmployeeForm: FormGroup
  AddNewTableForm: FormGroup


  selectedRole: boolean;
  selectedEmployment: boolean;
  myDate: any;
  date = new Date();
  dateTimeWord: string;
  @ViewChild('modal') public modalRef: TemplateRef<any>;
  employeeName = localStorage.getItem('globalName');
  employeePassword = localStorage.getItem('globalPassword');
  income = 0;
  isDisplayIncome = false;
  allRoles: Role[] = [];
  allEmployments: Employment[] = [];
  addPressed = false;
  formComplete = false;
  newTableComplete = false;
  soldMealsAmount: number;
  IsManager;
  IsNewTable = false;
  IsDeleteEmployee = false;


  // tslint:disable-next-line: max-line-length
  constructor(private messageService: MessageService, private orderDetailsService: OrderDetailsService, private router: Router, private workingHoursService: WorkingHoursService, private employeeService: CheckEmployeeService, private orderService: OrderService, config: NgbModalConfig, private modalService: NgbModal, private roleService: RoleService, private employmentService: EmploymentService, private tableSer: TableService, private fb: FormBuilder) {
    config.backdrop = 'static';
    config.keyboard = false;
    setInterval(() => {
      this.myDate = new Date();
    }, 1000);
    debugger
    this.dateTimeWord = this.employeeService.initDateTime(this.date);
    orderDetailsService.getSoldMealsAmount().subscribe(res => {
      debugger
      this.soldMealsAmount = res;
      // this.soldMealsAmount = res;//‏
      this.orderService.getTotalIncomeToDay().subscribe(result => {
        this.income = result;
        this.roleService.getRoles().subscribe(roleResult => {
          this.allRoles = roleResult;
          this.employmentService.getEmployments().subscribe(employmentResult => {
            this.allEmployments = employmentResult;
          });
        });
      });
    });

  }
  @ViewChild('content', { static: true }) cont: ElementRef;
  ngOnInit(): void {
    if (localStorage.getItem('globalRole') !== null &&
      localStorage.getItem('globalRole').toUpperCase() === "MANAGER") {
      this.IsManager = true;
    } else {
      this.IsManager = false;
    }
    this.addPressed = false;
    this.selectedRole = false;
    this.selectedEmployment = false;
    this.validatingForm = new FormGroup({
      contactFormModalName: new FormControl('', Validators.required),
      contactFormModalID: new FormControl('', [Validators.required, Validators.maxLength(9), Validators.minLength(9)]),
      contactFormModalBaseSalary: new FormControl('', Validators.required),
      contactFormModalSalaryTip: new FormControl('', Validators.required),
      contactFormModalRole: new FormControl('Choose role', Validators.required),
      contactFormModalEmployment: new FormControl('Choose employment', Validators.required)
    });
    this.deleteEmployeeForm = this.fb.group({
      contFirstNameAndLastName: ['', Validators.required],
      contCodeEmployee: ['', Validators.required],
    });
    this.AddNewTableForm = this.fb.group({
      numberOfSeatsTable: ['', Validators.required],
    });
  }



  // OnNewTableComplete() {
  //   if (this.numberOfSeatsTable !== null && this.numberOfSeatsTable <= 10 && this.numberOfSeatsTable > 0) {
  //     this.newTableComplete = true;
  //   }
  //   else {
  //     this.newTableComplete = false;
  //   }
  // }
  OnAddTableFormComplete() {
    debugger
    if (this.AddNewTableForm.get('numberOfSeatsTable').value !== null && this.AddNewTableForm.get('numberOfSeatsTable').value !== null) {
      this.IsNewTable = true;
    }
    else {
      this.IsNewTable = false;
    }
  }
  AddTable() {
    this.tableSer.AddNewTable(this.AddNewTableForm.get('numberOfSeatsTable').value).subscribe(data => {
      if (data) {
        this.showSuccess('The table has been successfully added');
      }
      else{
        this.showError('An error occurred and the table was not added successfully');
      }
    })
  }


  

  closeDialog() {
    this.modalService.dismissAll();
    this.selectedRole = false;
    this.selectedEmployment = false;
    this.addPressed = false;
  }
  workingHoursRouter() {
    this.router.navigate(['/working-hours']);
    this.closeDialog();
  }
  kitchenRouter() {
    this.router.navigate(['/chefs-area']);
    this.closeDialog();
  }
  onlineRouter() {
    localStorage.setItem('password', '');
    this.router.navigate(['/online-map']);
    this.closeDialog();
  }
  displayIncome() {
    this.isDisplayIncome = true;
  }
  showSuccess(employeeDetail: string) {
    this.messageService.add({ key: 'bc', severity: 'success', summary: 'Success', detail: employeeDetail });
  }
  showError(employeeDetail: string) {
    this.messageService.add({ key: 'bc', severity: 'error', summary: 'Error', detail: employeeDetail });
  }
  DeleteEmployeeRouter(){
    this.router.navigate(['/all-employees']);
  }

  get contactFormModalName() {
    return this.validatingForm.get('contactFormModalName');
  }
  get contactFormModalID() {
    return this.validatingForm.get('contactFormModalID');
  }
  get contactFormModalBaseSalary() {
    return this.validatingForm.get('contactFormModalBaseSalary');
  }
  get contactFormModalSalaryTip() {
    return this.validatingForm.get('contactFormModalSalaryTip');
  }
  get contactFormModalRole() {
    return this.validatingForm.get('contactFormModalRole');
  }
  get contactFormModalEmployment() {
    return this.validatingForm.get('contactFormModalEmployment');
  }
  get contFirstNameAndLastName() {
    return this.validatingForm.get('contFirstNameAndLastName');
  }
  get contCodeEmployee() {
    return this.validatingForm.get('contCodeEmployee');
  }

  onRoleChange() {
    if (this.contactFormModalRole.value !== 'Choose role' && this.contactFormModalRole.value !== '') {
      this.selectedRole = true;
    }
    else {
      this.selectedRole = false;
    }
  }
  onEmploymentChange() {
    if (this.contactFormModalEmployment.value !== 'Choose employment' && this.contactFormModalEmployment.value !== '') {
      this.selectedEmployment = true;
    }
    else {
      this.selectedEmployment = false;
    }
  }
  onFormComplete() {
    if (this.selectedEmployment === true && this.selectedRole === true &&
      this.contactFormModalBaseSalary.value !== null && this.contactFormModalBaseSalary.value !== '' &&
      this.contactFormModalSalaryTip.value !== null && this.contactFormModalSalaryTip.value !== '' &&
      Number(this.contactFormModalID.value) >= 100000000 && Number(this.contactFormModalID.value) <= 999999999 &&
      this.contactFormModalName.value !== null && this.contactFormModalName.value !== ''
    ) {
      this.formComplete = true;
    } else {
      this.formComplete = false;
    }
  }
  OnDeleteEmployeeFormComplete() {
    debugger
    if (this.deleteEmployeeForm.get('contFirstNameAndLastName').value !== null && this.deleteEmployeeForm.get('contCodeEmployee').value !== null) {
      this.IsDeleteEmployee = true;
    }
    else {
      this.IsDeleteEmployee = false;
    }
  }

  onAddEmployee() {
    this.addPressed = true;
    this.onEmploymentChange();
    this.onRoleChange();
    const addEmployee = new Employee();
    addEmployee.employeeId = Number(this.contactFormModalID.value);
    addEmployee.employeeFirstName = this.contactFormModalName.value.toString().split(' ')[0];
    addEmployee.employeeLastName = this.contactFormModalName.value.toString().split(' ')[1];
    addEmployee.baseSalary = this.contactFormModalBaseSalary.value;
    addEmployee.salaryTip = this.contactFormModalSalaryTip.value;
    addEmployee.startingDate = new Date();
    addEmployee.roleCode = this.allRoles.find(r => r.roleName === this.contactFormModalRole.value).roleCode;
    addEmployee.employmentCode = this.allEmployments.find(e => e.employmentName === this.contactFormModalEmployment.value).employmentCode;
    this.employeeService.addEmployee(addEmployee).subscribe(res => {
      addEmployee.employeeCode = res;
      if (addEmployee.employeeCode !== -1) {
        this.showSuccess('Your code is:  ' + addEmployee.employeeCode);
        return;
      }
      this.showError('Sorry... One or more details dont match');
    });
  }
  exit() {
    this.workingHoursService.updateExitTimeAndTotalHours(Number(localStorage.getItem('workingHoursCode'))).subscribe(() => { });
  }// ‏
}
