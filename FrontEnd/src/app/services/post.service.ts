import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


// const baseUrl = `${environment.apiUrl}/posts`;
const baseUrl = `${environment.baseUrl}/posts`;

@Injectable({
  providedIn: 'root'
})

export class PostService {

  constructor(private http: HttpClient) { }
  

  getAllPost(): Observable<any> {
    let headers = new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    return this.http.get<any>(`${baseUrl}/home`, { headers });
  }

 
  create(data: any): Observable<any> {
    let headers = new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    return this.http.post(`${baseUrl}/create`, data, { headers });
  }
  
  
}
