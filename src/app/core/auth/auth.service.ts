import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, timeout } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface CaptchaData {
  captchaId: string;
  imageBase64: string;
}

export interface CaptchaResponse {
  status: boolean;
  statusCode: number;
  data: CaptchaData;
  message: string[];
}

export interface LoginRequest {
  mobileNo: string;
  captchaId: string;
  captchaInput: string;
  password: string;
}

export interface LoginResponse {
  status: boolean;
  statusCode: number;
  data: string;
  message: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/Authentication`;
  private readonly TOKEN_KEY = 'auth_token';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getCaptcha(): Observable<CaptchaResponse> {
    const cacheBuster = new Date().getTime();
    return this.http.get<CaptchaResponse>(`${this.apiUrl}/captcha?t=${cacheBuster}`).pipe(
      timeout(10000)
    );
  }

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, data).pipe(
      timeout(15000)
    );
  }

  forgetPassword(mobileNoQuery: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/forget-password?mobile_no=${mobileNoQuery}`, data).pipe(
      timeout(15000)
    );
  }

  saveToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.TOKEN_KEY);
    }
  }
}
