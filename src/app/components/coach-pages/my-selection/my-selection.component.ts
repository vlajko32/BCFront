import { Component, OnInit } from '@angular/core';
import { CoachService } from 'src/app/services/coaches/coach.service';

@Component({
  selector: 'app-my-selection',
  templateUrl: './my-selection.component.html',
  styleUrls: ['./my-selection.component.css']
})
export class MySelectionComponent implements OnInit {
  user= null;
  userID = null;
  selection = null;
  players: any;
  coaches: any;
  constructor(private coachService: CoachService) { }

  ngOnInit(): void {
    this.userID = localStorage.getItem('userID');
    this.coachService.getCoachByID(this.userID).subscribe(data =>
      {
        
        this.user = data;
        console.log(this.user);
        this.selection = this.user['selection'];
        this.players = this.selection['players'];
        this.coaches = this.selection['coaches'];
      })
  }
}
