import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { Observable } from 'rxjs';


const baseUrl = 'http://localhost:8000/api/posts';

@Injectable({
  providedIn: 'root'
})

export class PostService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(baseUrl);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }
 
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
}
