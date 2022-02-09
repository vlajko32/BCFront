import { LoginService } from './../../../services/auth/login.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/domain/user';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  

  loginForm: FormGroup;

  constructor(private loginService: LoginService,  private snackBar: MatSnackBar) { }
  ngOnInit(){
    localStorage.clear();
    this.loginForm = new FormGroup({
      username: new FormControl(null,Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

 onLogin(){
   if(this.loginForm.valid){
     this.loginService.login(this.loginForm.get('username').value,this.loginForm.get('password').value);
   }
 }

 
 
}
