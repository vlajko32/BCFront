import { CoachService } from './../../../services/coaches/coach.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/domain/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user= null;
  userID = null;
  name: any;
  constructor(private coachService: CoachService) { }

  ngOnInit(): void {
    this.userID = localStorage.getItem('userID');
    this.coachService.getCoachByID(this.userID).subscribe(data =>
      {

        this.user = data;
        console.log(this.user);
        this.name = this.user['name'];
      })
  }

}
