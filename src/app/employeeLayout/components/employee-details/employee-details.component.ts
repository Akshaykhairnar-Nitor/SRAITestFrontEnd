import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'src/shared/Services/employeeService/employee.service';
import {  MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
})
export class EmployeeDetailsComponent implements OnInit, OnDestroy {
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
  @ViewChild(MatSort) sort: MatSort;

  getEmployeeDetailsSubscription: Subscription;

  constructor(
    private router: Router,
    private employeeService: EmployeeService   
  ) {  }

  ngOnInit(): void {
    this.loggedInuserDetails = JSON.parse(localStorage.getItem('LoggedinUser'));
    this.UserId = this.loggedInuserDetails.userId;
    this.getEmployeeDetails(this.UserId);
  }
  
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  getEmployeeDetails = (userId) => {
    this.getEmployeeDetailsSubscription = this.employeeService
      .getEmployeeDetails(userId)
      .subscribe((response) => {
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
          this.dataSource = new MatTableDataSource(data);

        }
      });
  };
  openTimeSheet = () => {
    this.router.navigate(['employeeLayout/timesheet']);
  };
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnDestroy() {
    this.getEmployeeDetailsSubscription
      ? this.getEmployeeDetailsSubscription.unsubscribe()
      : null;
  }
  trackByFn(item) {
    return item.id; // unique id corresponding to the item
  }
}
