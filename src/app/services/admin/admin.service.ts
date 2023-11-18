import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public baseUrl = environment.baseUrl + '/Administrator';
  pom: any;
  constructor(private http: HttpClient) { }

  getAllAdmins(): Observable<any> {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      this.pom = jwt_decode(token);
      console.log(this.pom);

      if (this.pom && this.pom.UserId) {
        const userId = this.pom.UserId;
        console.log('User ID:', userId);

        const headers = new HttpHeaders({
          'Authorization': 'Bearer ' + token
        });

        return this.http.get<any>(`${this.baseUrl}/admins?currentAdminId=${userId}`, { headers });
      } else {
        console.log('User ID not found in token.');
      }
    } else {
      console.log('Token not found in localStorage.');
    }

    return new Observable(); // Return empty observable or handle the case when token or user ID is missing
  }


  getAllReceptionists(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    console.log("token", localStorage.getItem('token'))
    return this.http.get<any>(this.baseUrl + '/receptionists', { headers });
  }

  getAllManagers(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get<any>(this.baseUrl + '/managers', { headers });
  }

  getAdmin(id: number): Observable<any> {

    return this.http.get(`${this.baseUrl}/admin/${id}`);
  }

  addAdmin(administrator: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.post(`${this.baseUrl}/add-admin`, administrator, { headers });
  }

  addManager(manager: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.post(`${this.baseUrl}/add-manager`, manager, { headers });
  }

  addReceptionist(receptionist: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.post(`${this.baseUrl}/add-receptionist`, receptionist, { headers });
  }

  deleteAdmin(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }
}
