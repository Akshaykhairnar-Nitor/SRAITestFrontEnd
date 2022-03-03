import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeLayoutComponent } from './employee-layout.component';
import { EmployeeLayoutRoutingModule } from './employee-layout-routing.module';
import { MaterialModule } from 'src/app/material-module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { TimesheetDetailsComponent } from './components/timesheet-details/timesheet-details.component';
import { SharedComponentModule } from '../sharedComponent/shared-Component.module';

@NgModule({
  imports: [
    CommonModule,
    EmployeeLayoutRoutingModule,
    FormsModule,
    MaterialModule,
    SharedComponentModule
  ],
  declarations: [
    EmployeeLayoutComponent,
    EmployeeDetailsComponent,
    TimesheetDetailsComponent
  ],
})
export class EmployeeLayoutModule {}
