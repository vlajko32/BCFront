import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlayerService } from 'src/app/services/players/player.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  newPlayer: any;
  playerForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private playerService: PlayerService) { }

  ngOnInit(): void {
    let birthDate = new Date(this.data.birthDate).toDateString();
    this.playerForm = new FormGroup({
      firstName: new FormControl(this.data.name, [Validators.required, Validators.minLength(3)]),     
      lastName: new FormControl(this.data.surname,  [Validators.required, Validators.minLength(3)]),
      birthDate: new FormControl(birthDate, Validators.required),
      height: new FormControl(this.data.height),
      weight: new FormControl(this.data.weight)
  })
  }


  onUpdatePlayer(){
    this.newPlayer = {
      name: this.playerForm.get('firstName').value,
      surname: this.playerForm.get('lastName').value,
      birthDate: this.playerForm.get('birthDate').value,
      height: this.playerForm.get('height').value,
      weight: this.playerForm.get('weight').value,
      selectionID: this.data.selectionID
    }
    this.playerService.updatePlayer(this.data.playerID,this.newPlayer).subscribe(data=> {
      console.log(data);
    });
  
   
  
  }

}
