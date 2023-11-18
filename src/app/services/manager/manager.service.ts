import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  public baseUrl = environment.baseUrl + '/Manager';

  constructor(private http: HttpClient) { }

  getAllTrainers(sieveModel: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.get<any>(`${this.baseUrl}/trainers`, { headers, params: sieveModel });
  }

  addTrainerSalary(trainerId: any, salaryAmount: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    const body = {
      trainerId: trainerId,
      salaryAmount: salaryAmount
    };
    return this.http.post(`${this.baseUrl}/add-salary`, null, {
      headers,
      params: { trainerId, salaryAmount }
    });
  }

  addMembership(memberId: number, membershipAmount: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    const body = {
      memberId: memberId,
      membershipAmount: membershipAmount
    };

    const url = `${this.baseUrl}/add-membership/${memberId}/${membershipAmount}`;

    return this.http.post(url, null, { headers });
  }

  getTrainerOccurrence(trainerId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get(`${this.baseUrl}/trainer-members/${trainerId}`, { headers });
  }

  getAllMembers(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.get<any>(environment.baseUrl + '/Trainer/members', { headers });
  }
}
