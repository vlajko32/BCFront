import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coach } from 'src/app/domain/coach';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoachService {

  constructor(private http: HttpClient)
  { }

  getCoaches()
  {
    return this.http.get(environment.apiUrl + 'coach',{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
  }

  getCoachByID(id: Number)
  {
    return this.http.get(environment.apiUrl + `coach/${id}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
  }

  getCoachesWithoutSelection()
  {
    return this.http.get(environment.apiUrl + 'coach/withoutSelection',{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
  }

  deleteCoach(id: number){
    return this.http.delete(environment.apiUrl+`coach/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
  }

  updateCoach(id: number, item: Coach)
  {
    return this.http.put(environment.apiUrl + `coach/${id}`,item,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
  }

  
}
