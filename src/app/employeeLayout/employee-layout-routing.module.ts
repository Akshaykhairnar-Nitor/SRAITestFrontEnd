import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/shared/guard/auth.guard';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { TimesheetDetailsComponent } from './components/timesheet-details/timesheet-details.component';
import { EmployeeLayoutComponent } from './employee-layout.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeLayoutComponent,
    children: [
      {
        path: 'employeeDetails',
        component: EmployeeDetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'timesheet',
        component: TimesheetDetailsComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeLayoutRoutingModule {}
