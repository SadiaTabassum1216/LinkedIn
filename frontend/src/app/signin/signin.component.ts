import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  user: User= new User();


  constructor(private http: HttpClient,private router: Router) { }
  onSubmit() {
    this.http.post<any>('http://localhost:8000/api/users/login', this.user).subscribe(data => {
      console.log(data);
    });
 
    this.router.navigate(['/home']);
    
  }
}
