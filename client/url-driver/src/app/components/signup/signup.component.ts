import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  user = { username: '', email: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService) {}

  onSignup() {
    this.authService.signup(this.user).subscribe({
      next: () => alert('User created successfully!'),
      error: (err) => this.errorMessage = err.error?.message || 'An error occured while signing up.'
    });
  }
}
