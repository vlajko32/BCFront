import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { User } from 'src/app/domain/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  apiUrl: String;

  constructor(private http: HttpClient, private router: Router) { }


  registerUser(user: User){
    this.http.post(`${environment.apiUrl}Auth/register`, user).subscribe((value: Response) =>
    {
      this.router.navigateByUrl('/login');
    }, error => {
      console.log(error);
    })

  }
}
