import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  public baseUrl = environment.baseUrl + '/Receptionist';
  constructor(private http: HttpClient) { }

  createRegistrationRequest(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-registration-request`, request);
  }
}
