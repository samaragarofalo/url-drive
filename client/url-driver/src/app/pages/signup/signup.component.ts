import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  email = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  signupUser() {
    this.http.post('http://localhost:8000/api/signup/', {
      email: this.email,
      password: this.password
    }).subscribe(response => {
      console.log('User registered:', response);
      this.router.navigate(['/signup']);
    }, error => {
      console.error('User registration failed:', error);
    });
  }
}
