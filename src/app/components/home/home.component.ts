import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/shared/Services/employeeService/employee.service';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loggedInuserDetails: any;
  UserId: string;
  EmployeeDetails: any = [];
  dataSource: any = [];
  displayedColumns: string[] = [
    'position',
    'projectName',
    'projectDescription',
    'projectManager',
    'project_StartDate',
  ];
  details: any = [];
  empDetails: any = [];
  showTimeSheet: boolean = false;
  AllTimeSheetData: any = [];
  SelectedDate: Date = new Date();
  SelectedProject: string;
  noChartData: boolean = false;

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
            project_StartDate: element['project_StartDate'],
          };
          data.push(tabledata);
        });
        this.dataSource = data;
      }
    });
  };
  openTimeSheet = () => {
    if (this.showTimeSheet === false) {
      this.showTimeSheet = true;
      this.getTimeSheetDetails(this.empDetails.empId);
    } else {
      this.showTimeSheet = false;
    }
  };
  getTimeSheetDetails = (empId) => {
    this.employeeService.getTimeSheetDetails(empId).subscribe((response) => {
      if (response && response[0]) {
        this.AllTimeSheetData = response;
        this.onChange(new Date(), this.empDetails.projectName);
        this.SelectedProject = this.empDetails.projectName;
      }
    });
  };
  onChange = (date, Project) => {
    let filteredData = [];
    if (Project) {
      filteredData = this.AllTimeSheetData.filter(
        (x) =>
          new Date(x.date).toDateString() === new Date(date).toDateString() &&
          x.projectName === Project
      );
    } else {
      filteredData = this.AllTimeSheetData.filter(
        (x) => new Date(x.date).toDateString() === new Date(date).toDateString()
      );
    }
    this.piechartshow(filteredData);
  };

  piechartshow = (data) => {
    if (data && data.length > 0) {
      this.noChartData = false;
      let chart = am4core.create('chartdiv', am4charts.PieChart);
      chart.data = data;

      // Add and configure Series
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = 'time';
      pieSeries.dataFields.category = 'taskDetails';
    } else {
      this.noChartData = true;
    }
  };

  OnSignOut = () => {
    this.router.navigate(['/login']);
    localStorage.clear();
  };
}
