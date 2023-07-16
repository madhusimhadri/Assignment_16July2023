import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  getUserData(): Observable<any>{
    let url = "assets/data/userData.json";
    return this.http.get(url);
  }
}
