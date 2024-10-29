import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "@env/environment";
import { Router } from "@angular/router";
import { LoginRequest, TokenResult } from "./auth";
import { Result } from "@core/base/result";
import { handleResult } from "@core/base/handle-result";
import { NotificationService } from "@core/services/notification/notification.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private tokenKey = 'authToken';
  private expirationKey = 'tokenExpiration';
  isLoggedIn$ = new BehaviorSubject<boolean>(this.isAuthenticated());

  client = inject(HttpClient);
  router = inject(Router);
  notificationService = inject(NotificationService);

  publicKey = signal<string>('');

  login(username: string, password: string): void {
    const credentials = <LoginRequest>{ username, password };
    this.client.post<Result<TokenResult>>(this.apiUrl + "/login", credentials)
      .pipe(
        handleResult(this.notificationService)
      )
      .subscribe({
        next: (response: Result<TokenResult>) => {
          const value = response.value!;
          this.storeToken(value.accessToken, new Date(value.expirationDateUTC));
          this.isLoggedIn$.next(true);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Login failed', err);
        },
      });
  }

  private storeToken(token: string, dateUTC: Date): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.expirationKey, dateUTC.toISOString());
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getTokenExpiration(): string | null {
    return localStorage.getItem(this.expirationKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    const expiration = this.getTokenExpiration();
    if (token && expiration) {
      return new Date() < new Date(expiration);
    }
    return false;
  }

  logout(): void {
    this.client.post(this.apiUrl + '/logout', {}).subscribe({
      complete: () => {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.expirationKey);
        this.isLoggedIn$.next(false);
        this.router.navigate(['/auth/login']);
      }
    });
  }

  getPublicKey(): Observable<string> {
    return this.client.get(this.apiUrl + '/publickey', { responseType: 'text' });
  }
}