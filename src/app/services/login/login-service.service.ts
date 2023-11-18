import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  login(user: any) : Observable <any> {
    return this.http.post(this.baseUrl + '/Login/PostLoginDetails', user)
  }
}
