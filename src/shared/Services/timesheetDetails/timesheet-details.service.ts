import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimesheetDetailsService {

  constructor(private http: HttpClient) {}
  
  getTimeSheetDetails= (EmpId) => {
    const url = `${environment.employeeUrl}api/GetEmployeeWorkDetails/EmpId?EmpId=${EmpId}`;
    return this.http.get(url).pipe(map((x) => x));
  };
}
