import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MsalService } from '@azure/msal-angular';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  public isLoggedIn = false;
  private readonly _destroying$ = new Subject<void>();
  isIframe: boolean;
  backImage = 'src/assets/nitor-infotech.png';
  constructor(private authService: MsalService) {}

  ngOnInit() {
    // this.form = this.formBuilder.group({
    //   username: ['', Validators.required],
    //   password: ['', Validators.required],
    // });
  }

  // get f() {
  //   return this.form.controls;
  // }

  // onSubmit() {
  //   this.submitted = true;
  //   if (this.form.invalid) {
  //     return;
  //   }
  //   this.loading = true;
  //   this.loginService
  //     .login(this.f.username.value, this.f.password.value)
  //     .pipe(first())
  //     .subscribe(
  //       (data) => {
  //         if (data && data['status'] === 'OK') {
  //           localStorage.setItem('isLoggedin', 'true');
  //           localStorage.setItem('LoggedinUser', JSON.stringify(data));
  //           this.router.navigate(['/employeeLayout/employeeDetails']);
  //         } else {
  //           this.isLoggedIn = true;
  //           this.loading = false;
  //         }
  //       },
  //       (error) => {
  //         this.loading = false;
  //       }
  //     );
  // }

  login() {
    this.authService.loginRedirect();
  }

  logout() {
    this.authService.logoutRedirect({
      // postLogoutRedirectUri: 'http://localhost:4200'
    });
  }
  // unsubscribe to events when component is destroyed
  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
