import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CheckEmployeeService } from '../services/check-employee.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { WorkingHoursService } from '../services/working-hours.service';
import { WorkingHours } from '../models/workingHours';
import { Employee } from '../models/employee';
import { formatDate } from '@angular/common';
import { Pictures } from '../models/pictures';

@Component({
  selector: 'app-enter-to-system',
  templateUrl: './enter-to-system.component.html',
  styleUrls: ['./enter-to-system.component.scss', './enter-to-system.component.css'],
  providers: [NgbModalConfig, NgbModal]
})

export class EnterToSystemComponent implements OnInit {
  pictures: Pictures[] = [
    { imgSrc: './assets/pizza-cutting-wooden-surface.jpg', foodName: 'Pizza tray' },
    { imgSrc: './assets/sweet-chocolate-cake-with-pomegranate-seeds-fresh-berries-it.jpg', foodName: 'Chocolate cake' },
    { imgSrc: './assets/lentil-soup-with-chopped-herbs-crackers.jpg', foodName: 'Orange soup' },
    { imgSrc: './assets/greek-salad-with-fresh-vegetables-feta-cheese-kalamata-olives.jpg', foodName: 'Greek salad' },
    { imgSrc: './assets/light-salad-with-vegetables-herbs-served-with-olive-oil.jpg', foodName: 'Salad' },
    { imgSrc: './assets/penne-pasta-in-tomato-sauce-with-chicken-and-tomatoes-on-a-wooden-table.jpg', foodName: 'Penne pasta' },
    { imgSrc: './assets/omelette-with-radish-red-onion-fresh-salad.jpg', foodName: 'Omelet' },
    { imgSrc: './assets/bagel-sandwich.jpg', foodName: 'Bagel sandwich' },
    { imgSrc: './assets/baked-salmon-garnished-with-asparagus-tomatoes-with-herbs.jpg', foodName: 'Salmon' },
    { imgSrc: './assets/friied-eggs-with-vegetables.jpg', foodName: 'Omelette' },
    { imgSrc: './assets/breakfast-fried-eggs-with-vegetables-shakshuka-frying-pan-black-turkish-style.jpg', foodName: 'Breakfast meal' },
    { imgSrc: './assets/cold-beverage-plastic-cup-mockup.jpg', foodName: 'Ice coffee' },
    { imgSrc: './assets/cocktail-glasses.jpg', foodName: 'Coctail glasses' },
    { imgSrc: './assets/delicious-sandwich.jpg', foodName: 'Sandwich toast' },
    { imgSrc: './assets/PH00460.jpg', foodName: 'Beer' },
    { imgSrc: './assets/PH00434.jpg', foodName: 'Pancakkes' },
    { imgSrc: './assets/PH00443.jpg', foodName: 'Cream cake' },
    { imgSrc: './assets/PH00446.jpg', foodName: 'Chocolate' },
    { imgSrc: './assets/PH00447.jpg', foodName: 'Soup' },
    { imgSrc: './assets/fish-finger-french-fries-chips-with-tomato-ketchup.jpg', foodName: 'French fries chips' },
    { imgSrc: './assets/front-close-view-chicken-sandwich-with-green-salad-vegetables.jpg', foodName: 'Salad sandwich' },
    { imgSrc: './assets/plate-with-paleo-diet-food-boiled-eggs-avocado-cucumber-nuts-cherry-strawberries.jpg', foodName: 'Vegies plate' },
    { imgSrc: './assets/selection-of-various-cocktails-on-the-table.jpg', foodName: 'Various drinks' },
    { imgSrc: './assets/tasty-turkish-bagels-kitchen-board.jpg', foodName: 'Bagels' },
    { imgSrc: './assets/colorful-soda-drinks-macro-shot.jpg', foodName: 'Colorful drinks' }


  ];
  responsiveOptions;
  @ViewChild('f') loginForm: NgForm;
  userNameValue?: string;
  passwordValue?: string;
  flag = false;
  loading = false;
  didntExit = true;
  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private checkEmployeeService: CheckEmployeeService, config: NgbModalConfig, private modalService: NgbModal, private workingHours: WorkingHoursService) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }
  ngOnInit(): void {

  }
  closeDialog() {
    this.modalService.dismissAll();

  }
  onlyLetters() {
    const lettersRegex = /^[A-Za-z ]+$/;
    if (!this.userNameValue?.match(lettersRegex)) {
      this.userNameValue = undefined;
    }
  }
  onSubmitForm() {
    this.loading = true;
    this.workingHours.employeeDidntExitSystemLastTime(Number(this.passwordValue)).subscribe(res => {
      debugger
      this.didntExit = res;
    });
    const numbersRegex = /^\d+$/;
    if (this.userNameValue === undefined || this.passwordValue === undefined ||
      this.userNameValue === '' || !this.passwordValue.toString().match(numbersRegex)) {
      this.flag = true;
      this.loading = false;
      this.router.navigate(['/']);
    }
    else {
      this.checkEmployeeService.checkEmployeeInDB(this.userNameValue, this.passwordValue).subscribe(result => {
        const role = result;
        localStorage.setItem('globalRole', role);
        if (role !== '') {
          switch (role.toLowerCase()) {
            case 'manager':
              {
                this.addEnterTime();
                this.loading = false;
                this.router.navigate(['manager-area']);
                break;
              }
            case 'waiter':
              {
                this.addEnterTime();
                this.loading = false;
                this.router.navigate(['/online-map']);
                break;
              }
            case 'chef':
              {
                this.addEnterTime();
                this.loading = false;
                this.router.navigate(['/chefs-area']);
                break;
              }
          }
          this.closeDialog();
          return;
        }
        else {
          this.loading = false;
          this.router.navigate(['/']);
          this.userNameValue = '';
          this.passwordValue = '';
        }
      });
    }
  }
  addEnterTime() {
    const wh = new WorkingHours();
    let employee = new Employee();
    wh.employeeCode = Number(this.passwordValue);
    this.checkEmployeeService.getByCode(Number(this.passwordValue)).subscribe(res => {
      employee = res;
      wh.employeeFirstName = employee.employeeFirstName;
      wh.employeeId = employee.employeeId;
      wh.employeeLastName = employee.employeeLastName;
      wh.enterTime = formatDate(new Date(), 'HH:mm:ss', 'en');
      wh.workingDate = new Date();
      wh.exitTime = '';
      wh.totalHoursForDay = '';
      this.workingHours.addWorkingHours(wh).subscribe(w => {
        if (w !== -1) {
          localStorage.setItem('workingHoursCode', w);
        }
      });
    });
  }
}
