import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Route, Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Fixed styleUrls to be plural
})
export class LoginComponent {
  userName = '';
  password = '';
  error = '';
  errorClass = '';

  usernamefound = false;
  passwordfound = false;
  entedusername = '';
  entedpassword = '';

  noopacity = 'buttonOpWithout';
  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.error = '';

    // Check if username or password is empty
    if (this.userName.trim().length === 0) {
      this.router.navigate(['home']);
      console.log(this.password);
      this.errorClass = 'error-message';
      this.error = 'Please enter UserName';
    } else if (this.password.trim().length === 0) {
      this.error = 'Please enter Password';
      this.errorClass = 'error-message';
    } else {
      this.error = 'Login SuccessFull!!';
      this.errorClass = 'error-message success';
      let res = this.auth.login(this.userName, this.password);
      if (res == 200) {
        console.log(res);
        this.router.navigate(['home']);
      } else {
        if (res == 403) {
          this.error = 'invalid credentials';
          this.errorClass = 'error-message';
        }
      }
    }

    if (this.password.trim().length != 0 && this.userName.trim().length != 0) {
      this.noopacity = 'buttonOp';
    }

    // Optionally, handle successful login here
  }
  nextPage = {
    main: 'WhatsNew',
    second: 'Connect Us',
  };
  showButton(evemt: MouseEvent) {
    console.log('mouse ere');
    this.noopacity = 'buttonOp';
  }
  leaveButton(evemt: MouseEvent) {
    console.log('mouse ere');
   
      this.noopacity = 'buttonOpWithout';
    
  }
  validateInput(event: Event, field: 'userName' | 'passWord') {
    const target = event.target as HTMLInputElement;
    console.log('validated');
    if (field == 'userName') {
      if (target.value != '') {
        this.usernamefound = true;
      }
      this.entedusername = target.value;
      this.validateInputs();
    }
    if (field == 'passWord') {
       if (target.value != '') {
         this.passwordfound = true;
       }
      this.passwordfound = true;
      this.entedpassword = target.value;
      this.validateInputs();
    }
  }
  validateInputs() {
    if (this.passwordfound && this.usernamefound) {
      if (this.entedpassword != '' && this.entedusername != '') {
        this.noopacity = 'buttonOp';
        this.usernamefound = false;
        this.passwordfound = false;
      } else {
        this.noopacity = 'buttonOpWithout';
      }
    }
  }
}
