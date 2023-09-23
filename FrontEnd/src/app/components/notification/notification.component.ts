import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Notification } from 'src/app/models/notification.model';
import { ModalComponent } from './modal/modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Post } from 'src/app/models/post.model';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  constructor(private router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
    private notificationService: NotificationService) { };
  userId = localStorage.getItem("userId");
  username = localStorage.getItem("username");
  token = localStorage.getItem("token");

  ngOnInit(): void {
    if (!this.token) {
      this.router.navigate(['/login']);
    }
    else {
      this.getNotifications();
    }
  }

  notificationList: Notification[] = [];

  getNotifications() {
    this.notificationService.getAllNotification().subscribe(data => {
      this.notificationList = data;
    });
  }

  postdata: Post = new Post();

  fetchPost(id: any) {
    this.notificationService.getPost(id).subscribe(data => {
      console.log(data);
      this.postdata = data;
      this.openPostModal(this.postdata);
      this.postdata = new Post();
    });

  }

  openPostModal(postData: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = postData;
    dialogConfig.width = '40%';
    dialogConfig.position = { left: '30%' };

    this.dialog.open(ModalComponent, dialogConfig);
  }

  logout() {
    this.authService.logout();
  }

}
