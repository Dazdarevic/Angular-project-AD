
  import { Injectable } from '@angular/core';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { environment } from 'src/app/environments/environment';

  @Injectable({
    providedIn: 'root'
  })
export class ReceptionistService {

    public baseUrl = environment.baseUrl + '/Receptionist';

    constructor(private http: HttpClient) { }

    sendEmail(emailModel: any): Observable<any> {
      const url = `${this.baseUrl}/send-email`;
      return this.http.post(url, emailModel);
    }

    getAllRequests(): Observable<any> {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      });

      const url = `${this.baseUrl}/get-all-requests`;
      return this.http.get(url, { headers });
    }

    approveRegistrationRequest(requestId: number): Observable<any> {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      });
      const url = `${this.baseUrl}/approve-registration-request/${requestId}`;
      return this.http.post(url, {});
    } 

    deleteRequest(requestId: number): Observable<any> {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      });
      const url = `${this.baseUrl}/delete-request/${requestId}`;
      return this.http.delete(url, { headers });
    }
}
