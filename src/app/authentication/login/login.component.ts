import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { LoginService } from 'src/shared/Services/loginService/login.service';

// import { AccountService, AlertService } from '@app/_services';
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
  public isLoggedIn=false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService 
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
      // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.loginService
      .login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        (data) => {
          if (data&& data['status']==='OK') {
            localStorage.setItem('isLoggedin', 'true');
            localStorage.setItem('LoggedinUser', JSON.stringify(data));
            this.router.navigate(['/employeeLayout/employeeDetails']);
          } else {
            this.isLoggedIn=true;
            this.loading = false;
          }
        },
        (error) => {
          this.loading = false;
        }
      );
  }
}
