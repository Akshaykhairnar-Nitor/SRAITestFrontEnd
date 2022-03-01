import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/shared/Services/employeeService/employee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loggedInuserDetails: any;
  UserId: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('LoggedinUser')) {
      this.loggedInuserDetails = JSON.parse(
        localStorage.getItem('LoggedinUser')
      );
      this.UserId = this.loggedInuserDetails.UserId;
    } else {
      this.router.navigate(['/login']);
    }
    this.getEmployeeDetails();
  }
  getEmployeeDetails = () => {
    this.employeeService
      .getEmployeeDetails(this.UserId)
      .subscribe((response) => {
        if (response) {
          debugger;
        }
      });
  };
  OnSignOut = () => {
    this.router.navigate(['/login']);
    localStorage.clear();
  };
}
