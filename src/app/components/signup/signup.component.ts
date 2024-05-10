import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  providers: [AuthService],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  showPassword1: boolean = false;
  showPassword2: boolean = false;

  userId: number = parseInt(localStorage.getItem('userId') || '0');

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]+'),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]+'),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  togglePassword(field: string) {
    if (field === 'password1') {
      this.showPassword1 = !this.showPassword1;
    } else if (field === 'password2') {
      this.showPassword2 = !this.showPassword2;
    }
  }

  onSubmit() {
    this.authService.login(); 
    this.userId++;
    const userdata = {
      id: this.userId,
      firstName: this.signupForm.value.firstName,
      LastrName: this.signupForm.value.lastName,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      confirmPassword: this.signupForm.value.confirmPassword,
      token:'asdfghjkl1234567890'
    };

    let existingData = JSON.parse(localStorage.getItem('userdata') || '[]');

    existingData.push(userdata);

    localStorage.setItem('userdata', JSON.stringify(existingData));
    localStorage.setItem('userId', this.userId.toString());

    this.router.navigate(['']);

    this.onReset();
    this.showPassword1 = false;
    this.showPassword2 = false;
  }

  onReset() {
    this.signupForm.reset();
  }
}
