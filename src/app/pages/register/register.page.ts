import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.css'],
  standalone: false,
})
export class RegisterPage {
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private toastController: ToastController,
    private router: Router
  ) {}
  public registerForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  public async registerNewUser() {
    if (!this.registerForm.valid) return;
    this.authService.registerNewUser(this.registerForm.value).subscribe({
      next: async () => {
        this.registerForm.reset();
        const toast = await this.toastController.create({
          message: 'User registered successfully!',
          duration: 2000,
          position: 'bottom',
        });
        await toast.present();
        this.router.navigateByUrl('/login');
      },
      error: (error) => console.error('Error registering user:', error),
    });
  }
}
