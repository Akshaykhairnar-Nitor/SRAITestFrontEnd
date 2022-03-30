import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public router: Router,
    private authService: MsalService,
  ) {}
  ngOnInit(): void {
    this.authService.instance.handleRedirectPromise().then((res) => {
      if (res && res.accessToken) {
        this.authService.instance.setActiveAccount(res.account);
        localStorage.setItem('LoggedinUser', res.accessToken);
        // localStorage.setItem('UserName', res.username);
        this.router.navigate(['/employeeLayout/employeeDetails']);
      }
    });
  }

  setLoginDisplay(): boolean {
    return this.authService.instance.getActiveAccount() != null;
  }}
