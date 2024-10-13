import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";
import { LoginRequest, TokenResult } from "./auth";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth/login`; // URL do endpointu logowania
  private tokenKey = 'authToken';
  private expirationKey = 'tokenExpiration';
  isLoggedIn$ = new BehaviorSubject<boolean>(this.isAuthenticated()); // Informacja o stanie zalogowania

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): void {
    const credentials = <LoginRequest>{ username, password };
    this.http.post<any>(this.apiUrl, credentials).subscribe({
      next: (response : any) => {
        this.storeToken(response.value.accessToken);
        this.isLoggedIn$.next(true);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Login failed', err);
      },
    });
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    //localStorage.setItem(this.expirationKey, expiration);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getTokenExpiration() : any {
    return localStorage.getItem(this.expirationKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;

    const expiration = this.getTokenExpiration();
    if (token && expiration) {
      return new Date() < new Date(expiration);
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.expirationKey);
    this.isLoggedIn$.next(false);
    this.router.navigate(['/login']);
  }
}