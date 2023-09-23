import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user: User= new User();
  
  constructor(private router: Router, private auth: AuthService) { }

  onSubmit() {
    this.auth.register(this.user).subscribe(data => {
      this.user= new User();
      this.router.navigate(['/login']);
    });
    
  }
}
