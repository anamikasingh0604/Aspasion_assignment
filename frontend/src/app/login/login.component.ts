import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
})
export class LoginComponent implements OnInit {
  authService = inject(AuthService); 

  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.email = '';
        this.password = '';
      });
  }

  onLogin() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    if (this.email && this.password) {
      const credentials = {
        email: this.email,
        password: this.password,
      };

      this.authService.login(credentials)
        .then(response => {
          console.log('Login successful:', response.data);
          const token = response.data.token;
          if (token) {
            localStorage.setItem('token', token);
          }
          alert('Login successful!');
          
          this.router.navigate(['/home']);
        })
        .catch(error => {
          console.error('Login failed:', error);
          alert('Login failed! Please check your credentials.');
        });
    } else {
      alert('Please enter email and password.');
    }
  }
}
