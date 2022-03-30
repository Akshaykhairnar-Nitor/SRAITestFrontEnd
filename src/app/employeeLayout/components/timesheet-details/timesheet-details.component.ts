import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import { TimesheetDetailsService } from 'src/shared/Services/timesheetDetails/timesheet-details.service';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-timesheet-details',
  templateUrl: './timesheet-details.component.html',
  styleUrls: ['./timesheet-details.component.scss'],
})
export class TimesheetDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  loggedInuserDetails: any[] = [];
  AllTimeSheetData: any;
  SelectedDate!: Date;
  SelectedProject!: string;
  noChartData: boolean = false;
  public EmpId:any;
  allProjectList: any = [];
  dataSource: any = [];
  displayedColumns: string[] = ['projectName', 'taskDetails', 'date', 'time'];
  totalTime: any = [];
  getTimeSheetDetailsSubscription!: Subscription;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private timesheetDetailsService: TimesheetDetailsService
  ) { }
  ngOnInit(): void {
    this.EmpId = localStorage.getItem('EmpId');
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.getTimeSheetDetails(this.EmpId);
  }

  getTimeSheetDetails = (empId:string) => {
    this.getTimeSheetDetailsSubscription
    this.timesheetDetailsService
      .getTimeSheetDetails(empId)
      .subscribe((response) => {
        if (response ) {
          this.totalTime = this.AllTimeSheetData = response;
          this.onChange(new Date(), this.SelectedProject);
          this.allProjectList = [
            ...new Set(this.AllTimeSheetData.map((item: { projectName: any; }) => item.projectName)),
          ];
          this.piechartshow(this.AllTimeSheetData);
          let data = [{}];
          this.AllTimeSheetData.forEach((element: { [x: string]: any; }, i: any) => {
            let tabledata = {
              projectName: element['projectName'],
              taskDetails: element['taskDetails'],
              date: element['date'],
              time: element['time'],
            };
            data.push(tabledata);
          });
          this.dataSource = data;
          this.dataSource = new MatTableDataSource(data);
          this.showAllData();
        }
      });
  };
  onChange = (date:Date, Project:string) => {
    let filteredData = [];
    if (Project) {
      filteredData = this.AllTimeSheetData.filter(
        (x: { date: string | number | Date; projectName: string; }) =>
          new Date(x.date).toDateString() === new Date(date).toDateString() &&
          x.projectName === Project
      );
    } else {
      filteredData = this.AllTimeSheetData.filter(
        (x: { date: string | number | Date; }) => new Date(x.date).toDateString() === new Date(date).toDateString()
      );
    }
    this.piechartshow(filteredData);
    this.totalTime = this.dataSource = filteredData;
  };
  getTotalTime = () => {
    return this.totalTime
      .map((t: { time: string; }) => parseInt(t.time))
      .reduce((acc: any, value: any) => acc + value, 0);
  };
  showAllData = () => {
    this.piechartshow(this.AllTimeSheetData);
    this.SelectedProject = '';
    this.SelectedDate = new Date();
    this.totalTime = this.dataSource = this.AllTimeSheetData;
  };
  piechartshow = (data:string[]) => {
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnDestroy() {
    this.getTimeSheetDetailsSubscription
      ? this.getTimeSheetDetailsSubscription.unsubscribe()
      : null;
  }
  trackByFn(item: { id: any; }) {
    return item.id; // unique id corresponding to the item
  }
}
