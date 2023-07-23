import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model'; 
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  ngOnInit(): void {
  this.getPost();
  }

  newsfeed: Post[] = [];
  newPost: Post= new Post();

  constructor(private router: Router, private postService: PostService){};

  getPost(){
    this.postService.getAll().subscribe(data => {  
      console.log(data);   
      this.newsfeed=data;
     
    });

  }

  onPost() {
    this.postService.create(this.newPost).subscribe(data => {
      console.log(data);
      this.newPost= new Post();
    });
  }

  onLogout() {
    this.router.navigate(['/signin']);
  }

}
