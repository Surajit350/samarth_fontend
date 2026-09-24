import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { AccessibilityService } from '../../../core/services/accessibility.service';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    InputTextModule,
    PasswordModule,
    ButtonModule
  ],
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  isForgotLoading = false;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private toast: ToastService,
    public accessibility: AccessibilityService
  ) {
    this.forgotPasswordForm = this.fb.group({
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  get ff() {
    return this.forgotPasswordForm.controls;
  }

  onForgotPasswordSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.isForgotLoading = true;
      const mobileNo = this.forgotPasswordForm.value.mobileNumber;
      const data = {
        mobileNo: mobileNo,
        password: this.forgotPasswordForm.value.newPassword
      };

      this.authService.forgetPassword(mobileNo, data).subscribe({
        next: (res) => {
          this.isForgotLoading = false;
          if (res?.status) {
            this.toast.success('Success', 'Password updated successfully. Please log in.');
            this.router.navigate(['/login']);
          } else {
            this.toast.error('Error', res?.message?.[0] || 'Failed to reset password.');
          }
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.isForgotLoading = false;
          this.toast.error('Error', err?.error?.message?.[0] || 'Failed to connect to server.');
          this.cdr.detectChanges();
        }
      });
    } else {
      this.forgotPasswordForm.markAllAsTouched();
    }
  }
}
