import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = `${environment.apiUrl}/users`;

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  constructor(private http: HttpClient, private router: Router) { }

  errorMessage: string = '';
  username: string = '';

  login(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/login`, data);
  }


  register(data: any) {
    return this.http.post(`${baseUrl}/register`, data);
  }


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

  getToken(): any {
    return localStorage.getItem('token');
    
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }

}
