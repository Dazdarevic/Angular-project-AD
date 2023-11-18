import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/app/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public baseUrl = environment.baseUrl + '/Photo';

  constructor(private http: HttpClient) { }

  sendPhoto(file: File) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(this.baseUrl + `/upload-photo`, formData, { headers });
  }
}
