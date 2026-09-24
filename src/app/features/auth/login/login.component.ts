import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { AccessibilityService } from '../../../core/services/accessibility.service';
import { NgxSpinnerService } from 'ngx-spinner';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    RouterModule
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  captchaLoading = false;
  captchaImageUrl: string = '';
  captchaError: string = '';
  captchaId: string = '';

  loginError: string = '';

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef,
    private toast: ToastService,
    public accessibility: AccessibilityService,
    private spinner: NgxSpinnerService
  ) {
    this.loginForm = this.fb.group({
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required]],
      securityCode: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.spinner.hide(); // Hide any global spinners that were triggered during navigation
    // Only call the API in the browser to prevent Node.js self-signed certificate errors during SSR
    if (isPlatformBrowser(this.platformId)) {
      this.generateCaptcha();
    }
  }

  generateCaptcha() {
    console.log('Refresh button clicked!');
    this.captchaLoading = true;
    this.captchaError = '';
    // Note: Do NOT clear loginError here so the user can read what went wrong!
    this.loginForm.patchValue({ securityCode: '' });
    this.loginForm.controls['securityCode'].setErrors(null);
    this.cdr.detectChanges(); // Force UI to update to loading state immediately

    this.authService.getCaptcha().subscribe({
      next: (res) => {
        try {
          console.log('Captcha API Response:', res);
          if (res?.status && res?.data?.imageBase64) {
            this.captchaId = res.data.captchaId;
            this.captchaImageUrl = res.data.imageBase64;
          } else {
            console.warn('Captcha API returned invalid format:', res);
            this.captchaError = 'Failed to load captcha';
          }
        } catch (e) {
          console.error('Error processing captcha:', e);
          this.captchaError = 'Internal error loading captcha';
        } finally {
          this.captchaLoading = false;
          this.cdr.detectChanges(); // Force UI update
        }
      },
      error: (err) => {
        console.error('Error fetching captcha:', err);
        this.captchaError = 'Error connecting to captcha service';
        this.captchaLoading = false;
        this.cdr.detectChanges(); // Force UI update
      }
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      if (!this.captchaId) {
        this.captchaError = 'Please wait for captcha to load.';
        return;
      }
      this.isLoading = true;
      this.spinner.show();
      this.captchaError = '';
      this.loginError = ''; // Clear previous login errors before submission
      this.cdr.detectChanges();

      const loginData = {
        mobileNo: this.loginForm.value.mobileNumber,
        captchaId: this.captchaId,
        captchaInput: this.loginForm.value.securityCode,
        password: this.loginForm.value.password
      };

      this.authService.login(loginData).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.spinner.hide();
          if (res?.status) {
            console.log('Login successful! Token:', res.data);
            this.authService.saveToken(res.data);
            this.toast.success('Login Successful', 'Welcome back to the portal.');
            this.router.navigate(['/dashboard']);
          } else {
            console.warn('Login failed:', res.message);
            this.loginError = res?.message?.[0] || 'Invalid credentials or captcha.';
            this.toast.error('Login Failed', this.loginError);
            this.generateCaptcha(); // Fetch new captcha on failure
          }
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Login error:', err);
          this.isLoading = false;
          this.spinner.hide();
          // When API throws a 400 or 500 error code, err.error contains the actual JSON payload
          this.loginError = err?.error?.message?.[0] || 'Login failed. Please try again.';
          this.toast.error('Login Error', this.loginError);
          this.generateCaptcha(); // Fetch new captcha on failure
          this.cdr.detectChanges();
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  get f() {
    return this.loginForm.controls;
  }
}
