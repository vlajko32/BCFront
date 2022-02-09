import { FormGroup, FormControl } from '@angular/forms';
import { CoachService } from './../../../services/coaches/coach.service';
import { Player } from './../../../domain/player';
import { PlayerService } from './../../../services/players/player.service';
import { SelectionService } from './../../../services/selections/selection.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-selection',
  templateUrl: './view-selection.component.html',
  styleUrls: ['./view-selection.component.css']
})
export class ViewSelectionComponent implements OnInit {
  selectionID: number;
  selection = null;
  players = null;
  coaches = null;
  modifiedPlayers = null;
  modifiedCoaches = null;
  selectionName: string;
  addingPlayer = false;
  addingCoach = false;
  playersWithoutSelection = null;
  coachesWithoutSelection = null;
  modifiedPlayersWithoutSelection = null;
  modifiedCoachesWithoutSelection = null;

  isDisabled = true;
  isDisabledAge = true;
  selectionAge: any;
  selectionAges = null;
  selectionAgeName: any;
  selectionAgeID = null;
  selectionForm: FormGroup;
  constructor(private route: ActivatedRoute, private selectionService: SelectionService, 
    private playerService: PlayerService, private coachService: CoachService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.selectionID = +params.get('selectionID');
      this.selectionService.getSelectionByID(this.selectionID).subscribe(data =>
        {
          this.selection = data;
          this.modifiedPlayers = this.players = this.selection['players'];
          this.modifiedCoaches = this.coaches = this.selection['coaches'];
          this.selectionName = this.selection['selectionName'];
          this.selectionAge = this.selection['selectionAge'];
          this.selectionAgeName = this.selectionAge['selectionAgeName'];
          console.log(this.selectionName)
          this.selectionForm.setValue({
            selectionName: this.selectionName,
            selectionAge: this.selectionAge['selectionAgeID']
          });
        })
        
    });
    this.playerService.getPlayersWithoutSelection().subscribe(data => {
      this.modifiedPlayersWithoutSelection = this.playersWithoutSelection = data;
    });

    this.coachService.getCoachesWithoutSelection().subscribe(data =>
      {
        this.modifiedCoachesWithoutSelection = this.coachesWithoutSelection = data;
      });

    this.selectionService.getSelectionAges().subscribe((data) =>{
      console.log(data);
      this.selectionAges = data;
    }, error => {
      console.log(error);
    });
    
    this.selectionForm = new FormGroup({
      selectionName: new FormControl({value: '', disabled: true}),
      
      selectionAge: new FormControl({value: '', disabled: true})
    });

  
  }

  onDiscard()
  {
    location.reload();
  }

  onConfirm()
  {
    let playersAdded = [];
    let playersRemoved = [];

    this.modifiedPlayers.forEach(element => {
      if(this.players.indexOf(element)>-1)
      {
        playersAdded.push(element);
      }
    });
    this.modifiedPlayersWithoutSelection.forEach(element => {
      if(this.playersWithoutSelection.indexOf(element)>-1)
      {
        playersRemoved.push(element);
      }
    });

    let coachesAdded = [];
    let coachesRemoved = [];
    this.modifiedCoaches.forEach(element => {
      if(this.coaches.indexOf(element)>-1)
      {
        coachesAdded.push(element);
      }
    });
    this.modifiedCoachesWithoutSelection.forEach(element => {
      if(this.coachesWithoutSelection.indexOf(element)>-1)
      {
        coachesRemoved.push(element);
      }
    });



    let updated = {
      selectionName: this.selectionName,
      selectionAgeID: this.selectionAge['selectionAgeID'],
      addedPlayers: playersAdded,
      removedPlayers: playersRemoved,
      addedCoaches: coachesAdded,
      removedCoaches: coachesRemoved
      

    };
    this.selectionService.updateSelection(this.selection['selectionID'], updated).subscribe(data => {
      console.log(data);
      location.reload();
    })
  }
 

  onAdd(p: any)
  {
    this.modifiedPlayers.push(p);
    let index = this.modifiedPlayersWithoutSelection.indexOf(p);
    this.modifiedPlayersWithoutSelection.splice(index,1);
    
  }


  onInsertCoach(c: any)
  {
    this.modifiedCoaches.push(c);
    let index = this.modifiedCoachesWithoutSelection.indexOf(c);
    this.modifiedCoachesWithoutSelection.splice(index,1);
    
  }



  onChangeName()
  {
    if(this.selectionForm.disabled)
    this.selectionForm.enable();
    else
    this.selectionForm.disable();

    this.isDisabled = !this.isDisabled;
  }
  onChangeAge()
  {
    this.isDisabledAge = !this.isDisabledAge;
  }

  onRemove(p: any)
  {
    this.modifiedPlayersWithoutSelection.push(p);
    let index = this.modifiedPlayers.indexOf(p);
    this.modifiedPlayers.splice(index,1);
  }

  onRemoveCoach(p: any)
  {
    this.modifiedCoachesWithoutSelection.push(p);
    let index = this.modifiedCoaches.indexOf(p);
    this.modifiedCoaches.splice(index,1);
  }
 

  onAddPlayer(){
    this.addingPlayer = !this.addingPlayer;
    
    
  }

  onAddCoach(){
    this.addingCoach = !this.addingCoach;
  }

}
