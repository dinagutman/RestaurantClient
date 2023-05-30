import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { WorkingHoursService } from '../services/working-hours.service';
import { WorkingHours } from '../models/workingHours';

@Component({
  selector: 'app-working-hours',
  templateUrl: './working-hours.component.html',
  styleUrls: ['./working-hours.component.css']
})
export class WorkingHoursComponent implements OnInit {
  minyear = new Date().getFullYear() - 2;
  maxyear = new Date().getFullYear();
  range: string = (this.minyear).toString() + ':' + (this.maxyear).toString();
  yearForm = Number(new Date().getFullYear() - 2);
  yearUntil = Number(new Date().getFullYear());
  myDate: any;
  date = new Date();
  from: any;
  until: any;
  search: string;
  allEmployeesHours: WorkingHours[] = [];
  loading = true;
  commanValidate: boolean;
  validate: boolean;
  IsManager;
  @ViewChild('dt') table: Table;
  constructor(private workingHoursService: WorkingHoursService) {
    setInterval(() => {
      this.myDate = new Date();
    }, 1000);
  }
  ngOnInit() {
    if (localStorage.getItem('globalRole') !== null &&
    localStorage.getItem('globalRole').toUpperCase() === "MANAGER") {
    this.IsManager = true;
  } else {
    this.IsManager = false;
  }
  
    this.workingHoursService.getAllWorkingHours().subscribe(result => {
      this.allEmployeesHours = result;
      this.loading = false;
    });
  }
  onDateChange() {
    if ((this.from === undefined || this.until === undefined) || (this.from === '' || this.until === '')) {
      return;
    } else {
      if (this.from <= this.until) {
        this.validate = true;
        this.commanValidate = false;
      } else {
        this.validate = false;
        this.commanValidate = true;
      }
    }
  }
  searchLetter(letter: any) {
    this.search = letter;
  }
  filterBydates() {
    this.workingHoursService.getWorkingHoursBetweenDates(this.from, this.until, this.search).subscribe(result => {
      this.allEmployeesHours = result;
    });
  }
  initDates() {
    this.from = '';
    this.until = '';
    this.commanValidate = false;
    this.validate = false;
  }
}
