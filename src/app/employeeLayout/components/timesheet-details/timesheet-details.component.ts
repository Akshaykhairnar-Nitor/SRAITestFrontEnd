import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import { TimesheetDetailsService } from 'src/shared/Services/timesheetDetails/timesheet-details.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-timesheet-details',
  templateUrl: './timesheet-details.component.html',
  styleUrls: ['./timesheet-details.component.scss'],
})
export class TimesheetDetailsComponent implements OnInit, OnDestroy {
  loggedInuserDetails: any = [];
  AllTimeSheetData: any = [];
  SelectedDate: Date;
  SelectedProject: string;
  noChartData: boolean = false;
  EmpId: string;
  allProjectList: any = [];
  dataSource: any = [];
  displayedColumns: string[] = ['projectName', 'taskDetails', 'date', 'time'];
  totalTime: any = [];
  getTimeSheetDetailsSubscription: Subscription;

  constructor(
    private router: Router,
    private timesheetDetailsService: TimesheetDetailsService
  ) {}
  ngOnInit(): void {
    this.loggedInuserDetails = JSON.parse(localStorage.getItem('LoggedinUser'));
    this.EmpId = this.loggedInuserDetails.empId;
    this.getTimeSheetDetails(this.EmpId);
  }

  getTimeSheetDetails = (empId) => {
    this.getTimeSheetDetailsSubscription
    this.timesheetDetailsService
      .getTimeSheetDetails(empId)
      .subscribe((response) => {
        if (response && response[0]) {
          this.totalTime = this.AllTimeSheetData = response;
          this.onChange(new Date(), this.SelectedProject);
          this.allProjectList = [
            ...new Set(this.AllTimeSheetData.map((item) => item.projectName)),
          ];
          this.piechartshow(this.AllTimeSheetData);
          let data = [];
          this.AllTimeSheetData.forEach((element, i) => {
            let tabledata = {
              projectName: element['projectName'],
              taskDetails: element['taskDetails'],
              date: element['date'],
              time: element['time'],
            };
            data.push(tabledata);
          });
          this.dataSource = data;
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
    this.totalTime = this.dataSource = filteredData;
  };
  getTotalTime = () => {
    return this.totalTime
      .map((t) => parseInt(t.time))
      .reduce((acc, value) => acc + value, 0);
  };
  showAllData = () => {
    this.piechartshow(this.AllTimeSheetData);
    this.SelectedProject = '';
    this.SelectedDate = new Date();
    this.totalTime = this.dataSource = this.AllTimeSheetData;
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
  ngOnDestroy() {
    this.getTimeSheetDetailsSubscription
      ? this.getTimeSheetDetailsSubscription.unsubscribe()
      : null;
  }
  trackByFn(item) {
    return item.id; // unique id corresponding to the item
  }
}
