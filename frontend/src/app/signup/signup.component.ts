import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [FormsModule, RouterModule],
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  phoneNumber: string = '';

  constructor(private authService: AuthService) {}

  onRegister() {
    if (!this.validateEmail(this.email)) {
      alert('Invalid email format');
      return;
    }

    if (!this.validatePassword(this.password)) {
      alert('Password must be at least 8 characters long and include a special character.');
      return;
    }

    const userData = {
      name: this.name,
      email: this.email,
      password: this.password,
      phoneNumber: this.phoneNumber,
    };

    this.authService.register(userData)
      .then(response => {
        alert('Signup successful!');
        this.clearForm();
      })
      .catch(error => {
        if (error.response?.status === 409) {
          alert('Email already exists!');
        } else {
          alert('Signup failed. Please try again.');
        }
      });
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  validatePassword(password: string): boolean {
    const re = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return re.test(password);
  }

  clearForm() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.phoneNumber = '';
  }
}
