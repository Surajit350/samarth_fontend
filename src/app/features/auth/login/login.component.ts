import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    ButtonModule
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  captchaNum1: number = 0;
  captchaNum2: number = 0;
  captchaResult: number = 0;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required]],
      securityCode: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.generateCaptcha();
  }

  generateCaptcha() {
    this.captchaNum1 = Math.floor(Math.random() * 20) + 1;
    this.captchaNum2 = Math.floor(Math.random() * 10) + 1;
    this.captchaResult = this.captchaNum1 + this.captchaNum2;
    this.loginForm.patchValue({ securityCode: '' });
    this.loginForm.controls['securityCode'].setErrors(null);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      if (Number(this.loginForm.value.securityCode) !== this.captchaResult) {
        this.loginForm.controls['securityCode'].setErrors({ invalidCaptcha: true });
        return;
      }

      this.isLoading = true;
      // Simulate API call
      setTimeout(() => {
        console.log('Login Form Data', this.loginForm.value);
        this.isLoading = false;
        // this.router.navigate(['/dashboard']);
      }, 1500);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  get f() {
    return this.loginForm.controls;
  }
}
