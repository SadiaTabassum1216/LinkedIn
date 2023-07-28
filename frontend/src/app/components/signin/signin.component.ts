import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  user: User = new User();


  constructor(private authService: AuthService, private router: Router) { }

  errorMessage: string = '';

  login() {
    this.authService.login(this.user).subscribe(
      (result: any) => {
        if (result) {
          localStorage.setItem("token", result.token);
          localStorage.setItem("userId", result.userId);
          localStorage.setItem("username", result.username);
          this.router.navigate(['/home']);
        }
        else {
          this.errorMessage = result.message || 'Unknown error occurred';
        }
      },
    );
  }

  onSubmit() {
    this.login();
  }
}
