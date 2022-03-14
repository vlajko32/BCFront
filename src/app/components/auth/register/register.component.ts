import { SelectionService } from './../../../services/selections/selection.service';
import { User } from './../../../domain/user';
import { RegisterService } from './../../../services/auth/register.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPositionBottom: MatSnackBarVerticalPosition = 'bottom';
  verticalPositionTop: MatSnackBarVerticalPosition = 'top';

  isChecked = true;
  role: any;
  registerForm: FormGroup;
  user: User;
  selections: any;
  selectedSelection: any;
  constructor(private registerService: RegisterService, private selectionService: SelectionService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, [Validators.required]),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      role: new FormControl('Administrator'),
      yearsOfExperience: new FormControl(null),
      selectionID: new FormControl(null),
      code: new FormControl(null, Validators.required)
      
    });
    this.role = 'Administrator';
    this.selectionService.getSelections().subscribe(data => {
      this.selections = data; 
    })


    
  }

  openSnackBarRegister(message: string) {
    let snackBarRef = this.snackBar.open(message, 'Dismiss', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPositionBottom,
    });
    snackBarRef.afterDismissed().subscribe(() =>
    {
      if(message == 'Registered successfully!!')
      {
        this.registerForm.reset();
      }
      
    })
  }

  

  register()
  {

    this.user = {
      role: this.role,
      username: this.registerForm.get('username').value,
      password: this.registerForm.get('password').value,
      name: this.registerForm.get('firstName').value,
      surname: this.registerForm.get('lastName').value,
      code: this.registerForm.get('code').value
    }
    if(this.role == 'Coach')
    {
      this.user.yearsOfExperience = this.registerForm.get('yearsOfExperience').value == null ? 0 :this.registerForm.get('yearsOfExperience').value,
      this.user.selectionID =  this.registerForm.get('selectionID').value == null ? 0 : this.registerForm.get('selectionID').value;
    }
    console.log(this.user);
    this.registerService.registerUser(this.user).subscribe(data => {
      this.openSnackBarRegister('Registered successfully!');
    }, error => {
      console.log(error);
      this.openSnackBarRegister(error.error);
    });
  }

  onRegister(){
    if(this.registerForm.valid && this.registerForm.get('password').value==this.registerForm.get('confirmPassword').value){
      this.register();
    }
  }

  changeRole()
  {
    if(this.role == 'Administrator')
    {
      this.role = 'Coach';
    }
    else{
      this.role = 'Administrator';
    }
  }
  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    if(this.role == 'Administrator')
    {
      this.role = 'Coach';
    }
    else{
      this.role = 'Administrator';
    }
}

}
