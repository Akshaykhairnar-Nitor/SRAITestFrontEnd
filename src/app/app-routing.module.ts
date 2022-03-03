import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/shared/guard/auth.guard';
import { LoginComponent } from './authentication/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'employeeLayout',
    loadChildren: () =>
      import('./employeeLayout/employee-layout.module').then(
        (m) => m.EmployeeLayoutModule
      ),
    canActivate: [AuthGuard],
  },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
