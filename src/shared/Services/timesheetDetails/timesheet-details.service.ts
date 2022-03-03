import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimesheetDetailsService {

  constructor(private http: HttpClient) {}
  
  getTimeSheetDetails= (EmpId) => {
    const url = `https://localhost:5001/api/GetEmployeeWorkDetails/EmpId?EmpId=${EmpId}`;
    return this.http.get(url).pipe(map((x) => x));
  };
}
