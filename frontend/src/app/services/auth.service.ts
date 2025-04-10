import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://localhost:8080/api/auth'; 

  async register(userData: any) {
    return await axios.post(`${this.API_URL}/register`, userData);
  }

  async login(credentials: any) {
    return await axios.post(`${this.API_URL}/login`, credentials);
  }
}

