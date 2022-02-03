import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {

  constructor(private http: HttpClient) { }

  getSelections(){
    return this.http.get(environment.apiUrl + 'Selection',{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
  }

  getSelectionByID(id: number){
    return this.http.get(environment.apiUrl + 'Selection/' + id,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
  }

  getSelectionAges(){
    return this.http.get(environment.apiUrl + 'Selection/ages')
  }

  updateSelection(id: number, selection: any)
  {
    return this.http.put(environment.apiUrl + `Selection/${id}`,selection);  }
}
