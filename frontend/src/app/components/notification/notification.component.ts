import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  constructor(private router: Router, private authService: AuthService){};
  userId = localStorage.getItem("userId");
  username = localStorage.getItem("username");

  ngOnInit(): void {
    

    console.log(this.userId);
    if (!this.isLoggedIn()) {
      this.router.navigate(['/signin']);
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }

}
