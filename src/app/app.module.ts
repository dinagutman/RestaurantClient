import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AccordionModule } from 'primeng/accordion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { EnterToSystemComponent } from './enter-to-system/enter-to-system.component';
import { OnlineMapComponent } from './online-map/online-map.component';
import { EmployeePasswordValidatorDirective } from './directives/employee-password-validator.directive';
import { BackgroundColorDirective } from './directives/background-color.directive';
import { PaymentComponent } from './payment/payment.component';
import { AddGoodTimePipe } from './pipes/add-good-time.pipe';
import { OrdersInProcessComponent } from './orders-in-process/orders-in-process.component';
import { WarningBorderDirective } from './directives/warning-border.directive';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { EntranceToChefsAreaComponent } from './entrance-to-chefs-area/entrance-to-chefs-area.component';
import { ManagerAreaComponent } from './manager-area/manager-area.component';
import { NumOfDigitsDirective } from './directives/num-of-digits.directive';
import { OnlyLettersDirective } from './directives/only-letters.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OnlyNumbersDirective } from './directives/only-numbers.directive';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputMaskModule } from 'primeng/inputmask';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ProgressBarModule } from 'primeng/progressbar';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { WorkingHoursComponent } from './working-hours/working-hours.component';
import { CarouselModule } from 'primeng/carousel';
import { compileNgModule } from "@angular/compiler";
import { AllEmployeesComponent } from './all-employees/all-employees.component';






const ROUTS: Routes = [
  { path: '', component: EnterToSystemComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'online-map', component: OnlineMapComponent },
  { path: 'orders-in-process/:tableCode/:orderCode', component: OrdersInProcessComponent },
  { path: 'payment/:orderCode', component: PaymentComponent },
  { path: 'chefs-area', component: EntranceToChefsAreaComponent },
  { path: 'working-hours', component: WorkingHoursComponent },
  { path: 'manager-area', component: ManagerAreaComponent },
  { path: 'all-employees', component: AllEmployeesComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    EnterToSystemComponent,
    OnlineMapComponent,
    EmployeePasswordValidatorDirective,
    BackgroundColorDirective,
    PaymentComponent,
    AddGoodTimePipe,
    OrdersInProcessComponent,
    WarningBorderDirective,
    ForgotPasswordComponent,
    ManagerAreaComponent,
    NumOfDigitsDirective,
    OnlyLettersDirective,
    OnlyNumbersDirective,
    WorkingHoursComponent,
    EntranceToChefsAreaComponent,
    AllEmployeesComponent,
  ],
  exports: [ForgotPasswordComponent],
  imports: [
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule.forRoot(ROUTS),
    HttpClientModule,
    AccordionModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    DropdownModule,
    NgbModule,
    CommonModule,
    InputMaskModule,
    InputTextModule,
    MessagesModule,
    MessageModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    MDBBootstrapModule.forRoot(),
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    ProgressBarModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    CarouselModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule { }
