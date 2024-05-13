import { Component, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router,RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',  providers:[AuthService]

})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  showPassword: boolean = false;
  showAlert: boolean = false;
  loginSuccess: boolean = false;
  alertMessage: string = '';



  constructor(private router : Router, private authService:AuthService) {}



  ngOnInit() {
    this.initLocalStorage();
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]) ,
      password: new FormControl('', [Validators.required]) 
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    const userdata = JSON.parse(localStorage.getItem('userdata') || '[]');
    const user = userdata.find((user: any) => user.email === email && user.password === password);

    if (user) { 
      this.authService.login(); 
      this.showAlertMessage(true, 'Login successful');
      this.onReset();
      setTimeout(() => {
        this.router.navigate(['/blog-list']);
      }, 500);
    } else {
      this.showAlertMessage(false, 'You have entered an invalid username or password');
    }
  }

  onReset() {
    this.loginForm.reset();
  }
  initLocalStorage() {
    if (!localStorage.getItem('userdata')) {
      const initialUser = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.email',
        password: 'John@1234'
      };
  
      localStorage.setItem('userdata', JSON.stringify([initialUser]));
      localStorage.setItem('userId', '1');
    }
  }
  

  showAlertMessage(success: boolean, message: string) {
    this.loginSuccess = success;
    this.alertMessage = message;
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }


}
