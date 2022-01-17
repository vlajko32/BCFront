import { User } from './../../../domain/user';
import { RegisterService } from './../../../services/auth/register.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  user: User;

  constructor(private registerService: RegisterService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      
    });
    
    
  }

  register()
  {
    this.user = {
      role: 'Operator',
      username: this.registerForm.get('username').value,
      password: this.registerForm.get('password').value,
      name: this.registerForm.get('firstName').value,
      surname: this.registerForm.get('lastName').value

    }
    this.registerService.registerUser(this.user);
  }

  onRegister(){
    if(this.registerForm.valid){
      this.register();
    }
  }

}
