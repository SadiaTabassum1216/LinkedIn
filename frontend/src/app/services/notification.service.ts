import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = `${environment.apiUrl}/notifications`;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }
  unseenCount: number = 0;
  userId = localStorage.getItem("userId");

  getUnseenCount(): number {
    return this.unseenCount;
  }

  setUnseenCount() {
    this.getAllNotification().subscribe(data => {
      const unseenNotifications = data.filter((notification: {
        senderUserId: string | null; seen: any;
      }) => !notification.seen && notification.senderUserId !== this.userId);
      this.unseenCount = (unseenNotifications.length);

    });
  }

  createNotification(data: any): Observable<any> {
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
