import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  showPassword1: boolean = false;
  showPassword2: boolean = false;

  constructor() {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      firstName: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z0-9]+')]),
      lastName: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z0-9]+')]),
      email: new FormControl('', [Validators.required, Validators.email]) ,
      password: new FormControl('', [Validators.required,Validators.minLength(8)]),
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
    console.log(this.signupForm.value);
    this.onReset();
    this.showPassword1 = false;
    this.showPassword2 = false;
  }

  onReset() {
    this.signupForm.reset();
  }
}