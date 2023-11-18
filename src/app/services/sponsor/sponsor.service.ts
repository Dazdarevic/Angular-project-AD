
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SponsorService {
  public baseUrl = environment.baseUrl + '/Sponsor';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    console.log("token", localStorage.getItem('token'))
    return this.http.get<any>(this.baseUrl + '/list-ads', { headers });
  }

  addProduct(product: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.post(this.baseUrl + '/add-ad', product);
  }
}
