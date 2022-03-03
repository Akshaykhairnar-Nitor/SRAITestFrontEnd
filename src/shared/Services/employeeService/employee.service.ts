import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getEmployeeDetails = (UserId) => {
    const url = `https://localhost:5001/api/GetUserDetails/UserId?UserId=${UserId}`;
    return this.http.get(url).pipe(map((x) => x));
  };
 
}
