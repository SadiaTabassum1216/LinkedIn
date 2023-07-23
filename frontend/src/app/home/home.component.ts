import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  ngOnInit(): void {
  this.getPost();
  }
  postContent: string = '';
  newsfeed: Post[] = [];

  constructor(private router: Router, private http: HttpClient){};

  getPost(){
    this.http.get<any[]>('http://localhost:8000/api/post').subscribe(data => {  
      console.log(data);   
    });

  }

  onPost() {
   
  }

  onLogout() {
    this.router.navigate(['/signin']);
  }

}
