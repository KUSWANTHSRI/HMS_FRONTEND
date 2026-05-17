import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
   signupData = {
    name: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    joiningDate: '',
    medicalRegistrationNo: '',
    specialization: '',
    qualification: '',
    consultationFee: '',
    availabilitySlots: '',
    password: '',
    roles: ''
  };

  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: Auth,
    private router: Router
  ) {}

  onSignup() {
    this.errorMessage = '';
    this.successMessage = '';

    if (
      !this.signupData.name ||
      !this.signupData.email ||
      !this.signupData.phone ||
      !this.signupData.password ||
      !this.signupData.roles
    ) {
      this.errorMessage = 'Please fill all required fields';
      return;
    }

    const requestBody = {
      ...this.signupData,

      qualification: this.signupData.qualification
        ? this.signupData.qualification.split(',').map(q => q.trim())
        : [],

      availabilitySlots: this.signupData.availabilitySlots
        ? this.signupData.availabilitySlots.split(',').map(slot => slot.trim())
        : [],

      consultationFee: Number(this.signupData.consultationFee)
    };

    this.authService.signup(requestBody).subscribe({
      next: (res) => {
        console.log('Signup success:', res);
        this.successMessage = 'Signup successful';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      error: (err) => {
        console.log('Signup error:', err);
        this.errorMessage = err?.error?.message || 'Signup failed';
      }
    });
  }
}
