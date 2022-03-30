import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  OnSignOut = () => {
    this.router.navigate(['/login']);
    localStorage.clear();
  };
  OnDashboard = () => {
    this.router.navigate(['/employeeLayout/employeeDetails']);
  };
  OnTimeSheet = () => {
    this.router.navigate(['/employeeLayout/timesheet']);
  };
}
