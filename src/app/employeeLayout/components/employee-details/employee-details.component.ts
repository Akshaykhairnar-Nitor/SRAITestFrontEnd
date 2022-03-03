import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/shared/Services/employeeService/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
})
export class EmployeeDetailsComponent implements OnInit {
  loggedInuserDetails: any;
  UserId: string;
  EmployeeDetails: any = [];
  dataSource: any = [];
  displayedColumns: string[] = [
    'position',
    'projectName',
    'projectDescription',
    'projectManager',
  ];
  details: any = [];
  empDetails: any = [];
  
  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('LoggedinUser')) {
      this.loggedInuserDetails = JSON.parse(
        localStorage.getItem('LoggedinUser')
      );
      this.UserId = this.loggedInuserDetails.userId;
      this.getEmployeeDetails(this.UserId);
    } else {
      this.router.navigate(['/login']);
    }
  }
  getEmployeeDetails = (userId) => {
    this.employeeService.getEmployeeDetails(userId).subscribe((response) => {
      if (response && response[0]) {
        this.details = response;
        this.empDetails = response[0];
        let data = [];
        this.details.forEach((element, i) => {
          let tabledata = {
            position: i + 1,
            projectName: element['projectName'],
            projectDescription: element['projectDescription'],
            projectManager: element['projectManager'],
          };
          data.push(tabledata);
        });
        this.dataSource = data;
      }
    });
  };  
  openTimeSheet = () => {
    this.router.navigate(['employeeLayout/timesheet']);
  };

}
