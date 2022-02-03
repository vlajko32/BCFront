import { Player } from './../../domain/player';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) { }


  getPlayers(){
    return this.http.get(environment.apiUrl + 'player',{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
  }

  getPlayersWithoutSelection(){
    return this.http.get(environment.apiUrl + 'player/withoutSelection',{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
  }

  addPlayer(item){
    
    return this.http.post(environment.apiUrl + 'player/create',item);
  }

  deletePlayer(id: number){
    return this.http.delete(environment.apiUrl+`player/${id}`);
  }

  updatePlayer(id: number, item: Player)
  {
    return this.http.put(environment.apiUrl + `player/${id}`,item);
  }
}
