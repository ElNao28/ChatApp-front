import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css'],
  standalone: false,
})
export class LoginPage {
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  public loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  public loginUser(): void {
    if (!this.loginForm.valid) return;
    this.authService
      .loginUse(this.loginForm.value)
      .pipe(map((resp) => resp.token))
      .subscribe({
        next: (token) => {
          this.loginForm.reset();
          localStorage.setItem('token', token);
          this.router.navigateByUrl('/home');
        },
        error: (err) => console.error(err),
      });
  }
}
