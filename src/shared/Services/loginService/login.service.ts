import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    let data = {
      userName: username,
      password: password
    };
    const url = `https://localhost:5001/api/login`;
    return this.http.post(url, data).pipe(map((x) => x));
  }
}
