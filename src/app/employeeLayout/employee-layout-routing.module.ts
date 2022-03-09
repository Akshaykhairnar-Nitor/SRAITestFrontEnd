import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { TimesheetDetailsComponent } from './components/timesheet-details/timesheet-details.component';
import { EmployeeLayoutComponent } from './employee-layout.component';
import { MsalGuard } from '@azure/msal-angular';

const routes: Routes = [
  {
    path: '',
    component: EmployeeLayoutComponent,
    children: [
      {
        path: 'employeeDetails',
        component: EmployeeDetailsComponent,
        canActivate: [MsalGuard],
      },
      {
        path: 'timesheet',
        component: TimesheetDetailsComponent,
        canActivate: [MsalGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeLayoutRoutingModule {}
