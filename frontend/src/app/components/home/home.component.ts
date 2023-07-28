import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private postService: PostService, private notificationService: NotificationService, private authService: AuthService) { };
  userId = localStorage.getItem("userId");
  token = localStorage.getItem("token");
  ngOnInit(): void {
    if (!this.token) {
      this.router.navigate(['/login']);
    } else {
      this.getPost();
    }
  }


  newsfeed: Post[] = [];
  newPost: Post = new Post();
  selectedImage: File | null = null;


  getPost() {
    this.postService.getAllPost().subscribe(data => {
      this.newsfeed = data;
    });
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement?.files && inputElement.files.length > 0) {
      this.selectedImage = inputElement.files[0];
    }
  }


  onPost() {
    if (this.userId !== null) {
      this.newPost.userId = this.userId;
    }

    this.postService.create(this.newPost).subscribe(data => {
      this.newPost = data;
      console.log(data);
    });
    
    this.notificationService.createNotification(this.newPost).subscribe(data => {
      console.log(data);
      this.newPost = new Post();
    });

    window.location.reload();

  }


  logout() {
    this.authService.logout();
  }

}
