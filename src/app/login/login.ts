import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
   loginData = {
    email: '',
    password: ''
  };

  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: Auth ,
    private router: Router
  ) {}

  onLogin() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.loginData.email || !this.loginData.password) {
      this.errorMessage = 'Email and password are required';
      return;
    }

    this.authService.login(this.loginData).subscribe({
      next: (res) => {
        console.log('Login success:', res);

        const token = res?.data?.token || res?.token;

        if (token) {
          this.authService.saveToken(token);
        }

        this.successMessage = 'Login successful';

        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.log('Login error:', err);
        this.errorMessage = err?.error?.message || 'Login failed';
      }
    });
  }
}
