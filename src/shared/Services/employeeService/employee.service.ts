import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getEmployeeDetails = (UserName) => {
    const url = `${environment.employeeUrl}api/GetUserDetails/UserName?UserName=${UserName}`;
    return this.http.get(url).pipe(map((x) => x));
  };
 
}
