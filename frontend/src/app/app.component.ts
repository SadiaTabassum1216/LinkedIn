import { Component, OnInit } from '@angular/core';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor( private notificationService: NotificationService) { };
  ngOnInit(): void {
   this.notificationService.setUnseenCount();
  }
  title = 'frontend';
}
