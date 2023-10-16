import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// const baseUrl = `${environment.apiUrl}/notifications`;
const baseUrl = `${environment.notificationUrl}/notifications`;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }
  userId = localStorage.getItem("userId");

  create(data: any): Observable<any> {
    let headers = new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    return this.http.post(`${baseUrl}/create`, data, { headers });
  }


  getAllNotification(): Observable<any> {
    let headers = new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    return this.http.get<any>(`${baseUrl}/`, { headers });
  }


  getPost(postId: any): Observable<any> {
    let headers = new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    console.log("headers: ", headers);
    return this.http.get(`${baseUrl}/post/${postId}`, { headers });
  }
}
