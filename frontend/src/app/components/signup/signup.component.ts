import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user: User= new User();
  
  constructor(private http: HttpClient,private router: Router, private auth: AuthService) { }

  onSubmit() {
    this.http.post<any>('http://localhost:8000/api/users/register', this.user).subscribe(data => {
      console.log(data);
    });
    
    this.user= new User();
    this.router.navigate(['/home']);
    
  }
}