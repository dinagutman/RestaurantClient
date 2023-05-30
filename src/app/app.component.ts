import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private primengConfig: PrimeNGConfig) { }
  title = 'restaurant';

  @ViewChild('f') loginForm: NgForm;

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
