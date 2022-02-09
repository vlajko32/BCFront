import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  constructor(private http: HttpClient) { }

  addTraining(training: any)
  {
    console.log('brateee');
    return this.http.post(environment.apiUrl + 'training/create',training);
  }

  getTrainingsByGym(GymID: any)
  {
    return this.http.get(environment.apiUrl + `training/${GymID}`);
  }
}
