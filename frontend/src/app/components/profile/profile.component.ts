import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private router: Router,
    private postService: PostService,
    private authService: AuthService) { };

  userId = localStorage.getItem("userId");
  username = localStorage.getItem("username");
  token = localStorage.getItem("token");
  unseenCount: number = 0;

  ngOnInit(): void {
    if (!this.token) {
      this.router.navigate(['/login']);
    } else {
      this.getPost();
    }
  }

  newsfeed: Post[] = [];

  getPost() {
    this.postService.getAllPost().subscribe(data => {
      this.newsfeed = data;
    });
  }

  logout() {
    this.authService.logout();
  }

}
