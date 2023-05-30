import { Component,  OnInit } from '@angular/core';
import { CheckEmployeeService } from '../services/check-employee.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  providers: [NgbModalConfig, NgbModal, MessageService]
})

export class ForgotPasswordComponent implements OnInit {
  idInputValue: number;
  fullNameValue?: string;
  codeAfterForgetting: number;
  // tslint:disable-next-line: max-line-length
  constructor(private employeeService: CheckEmployeeService, private modalService: NgbModal, private messageService: MessageService) { }
  ngOnInit(): void {}
  onSubmitForgotPasswordForm() {
    this.employeeService.checkIdForgot(this.idInputValue, this.fullNameValue).subscribe(result => {
      this.codeAfterForgetting = result;
      if (this.codeAfterForgetting !== -1) {
        this.showSuccess();
      }
      else {
        this.showError();
      }
    });
  }
  closeDialog() {
    this.modalService.dismissAll();
  }
  showSuccess() {
    this.messageService.add({ key: 'bc', severity: 'success', summary: 'Success', detail: 'Your code is:  ' + this.codeAfterForgetting });
  }
  showError() {
    this.messageService.add({ key: 'bc', severity: 'error', summary: 'Error', detail: 'Sorry... One or more details dont match' });
  }
  onlyLetters() {
    const lettersRegex = /^[A-Za-z ]+$/;
    if (!this.fullNameValue?.match(lettersRegex)) {
      this.fullNameValue = undefined;
    }
  }
}
