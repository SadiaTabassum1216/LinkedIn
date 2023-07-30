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
  constructor(private router: Router,
    private postService: PostService,
    private notificationService: NotificationService,
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
      this.unseenCount = this.notificationService.getUnseenCount();
    }
  }


  newsfeed: Post[] = [];
  newPost: Post = new Post();

  getPost() {
    this.postService.getAllPost().subscribe(data => {
      this.newsfeed = data;
    });
  }



  onFileSelected(event: any) {
    this.newPost.image = event.target.files[0];
  }

  onPost() {
    if (this.userId !== null && this.username != null) {
      this.newPost.userId = this.userId;
      this.newPost.userName = this.username;
    }

    const formData = new FormData();
    // formData.append('userName', this.newPost.userName);
    // formData.append('userId', this.newPost.userId);
    // formData.append('text', this.newPost.text);
    if (this.newPost.image !== null) {
      formData.append('image', this.newPost.image, this.newPost.image.name);
    }
    // formData.append('fileURL', this.newPost.fileURL);
    // formData.append('time', this.newPost.time);

    // console.log("form data: ", formData);
    console.log("post data: ", this.newPost);

    this.postService.uploadImage(formData).subscribe(data => {
      this.newPost.fileURL = data.url;
      console.log(data);

      this.postService.create(this.newPost).subscribe(data => {
        this.newPost = data;
        console.log(data);

        this.notificationService.createNotification(this.newPost).subscribe(data => {
          // console.log(data);
          this.newPost = new Post();
          // window.location.reload();
        });

      })


    });


  }


  logout() {
    this.authService.logout();
  }

}
