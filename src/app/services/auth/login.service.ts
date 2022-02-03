import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Response} from "../../domain/response";
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private headers = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
  private options = {headers: this.headers};

  
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  public login(username: string, password: string){
    this.http.post(environment.apiUrl+'auth/login',{username,password},this.options).subscribe((value:Response) => {
      localStorage.setItem('token',value.token.toString());
      localStorage.setItem('userID', value.user.userID.toString());
      localStorage.setItem('role',value.user.role.toString());

      this.authService.authenticated = true;
      this.authService.role = value.user.role.toString();
      this.authService.token = value.token.toString();

      if(value.user.role === 'Operator'){
        this.router.navigateByUrl('/selections');
      }else if(value.user.role === 'Coach'){
        this.router.navigateByUrl('/user-home');
      }else{
        this.router.navigateByUrl('/register');
      }

    }, error => {
      console.log(error);
    })
  }
}
