import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  public baseUrl = environment.baseUrl + '/Member';

  constructor(private http: HttpClient) { }

  sortTrainersByField(sortByField: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }); return this.http.get<any>(`${this.baseUrl}/trainers/sort?sortByField=${sortByField}`,
    { headers });
  }

  getPaginatedTrainers(page: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get(`${this.baseUrl}/trainers/paginated`, { params });
  }

  getMember(id: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get(`${this.baseUrl}/member/${id}`, { headers });
  }

  getTrainer(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get(`${this.baseUrl}/mytrainer/${id}`, { headers });
  }
  getAllTrainers(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get(`${this.baseUrl}/trainers`, { headers });
  }

  chooseTrainer(memberId: number, trainerId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.put<any>(`${this.baseUrl}/${memberId}/choose-trainer/${trainerId}`,
    {}, { headers });
  }

  averageRatingForTrainer(trainerId: number): Observable<number> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get<number>(`${this.baseUrl}/average-rating/${trainerId}`, { headers });
  }

  checkRating(memberId: number, trainerId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get<any>(`${this.baseUrl}/${memberId}/check-rating/${trainerId}`, { headers });
  }

  resetSelectedTrainerId(memberId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    // Postavljanje zaglavlja pravilno u zahtevu
    return this.http.put(`${this.baseUrl}/${memberId}/reset-selectedtrainer`, {}, { headers });
  }


  getMembershipsForMember(memberId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/memberships/${memberId}`);
  }

  extendMembership(memberId: number, newMembershipAmount: string, targetMonth: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.post(`${this.baseUrl}/extend-membership/${memberId}`, {
      MembershipAmount: newMembershipAmount,
      Month: targetMonth
    }, { headers });
  }

  listProducts() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get(`${environment.baseUrl + '/Seller'}/list-products`, { headers });
  }

  listAds() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get(`${environment.baseUrl + '/Sponsor'}/list-ads`, { headers });
  }

  rateTrainer(memberId: number, trainerId: number, ratingValue: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    const body = { ratingValue };

    return this.http.post(
      `${this.baseUrl}/${memberId}/rate-trainer/${trainerId}/${ratingValue}`, {}, { headers });
  }

  getMemberComments(memberId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get(`${this.baseUrl}/comments/${memberId}`, { headers });
  }

  checkSelectedTrainer(memberId: any): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get<{ message: string }>
      (`${this.baseUrl}/check-selected-trainer/${memberId}`, { headers })
      .pipe(
        map(response => response.message) // Ekstrakcija polja poruke
      );
  }


}
