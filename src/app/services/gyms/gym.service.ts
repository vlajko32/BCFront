import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GymService {

  constructor(private http: HttpClient) { }

  getGyms(){
   return this.http.get(environment.apiUrl + 'gym',
   {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
   });
  }
}
